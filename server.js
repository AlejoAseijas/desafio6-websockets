const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const { engine } = require("express-handlebars");
const Productos = require("./Controller/productos");
let productosReq = new Productos();
let chat = [];

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialsDir: path.resolve(__dirname, "./views/partials"),
  })
);

app.set("views", "./views");
app.set("view engine", "handlebars");

app.get("/productos", async (req, res) => {
  let resData = await productosReq.get();
  res.render("index", { tableProducts: true, products: resData });
});

app.post("/productos", async (req, res) => {
  const resData = await productosReq.post(req.body);
  res.render("index", { tableProducts: true, products: resData });
});

io.on("connection", (socket) => {
  emitir();

  socket.on("incomingMessage", (message) => {
    chat.push(message);
    emitir();
  });
});

const emitir = () => io.sockets.emit("chat", chat);

server.listen(8080, () => {
  console.log(`Running on port: ${8080}`);
});
