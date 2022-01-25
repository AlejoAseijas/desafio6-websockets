const Fs = require("../model/productos.model");
const persist = new Fs("./data.json");

const getAll = async (req, res) => {
  try {
    const data = await persist.open();
    res.render("index", { tableProducts: true, products: data });
  } catch (err) {
    res.status(402).json({ err: "error al traer datos" });
  }
};

const postProduct = async (req, res) => {
  try {
    let data = await persist.save(req.body);
    res.status(201).redirect("/productos");
  } catch (err) {
    res.status(402).json({ err: "error al guardar datos" });
  }
};

module.exports = { getAll, postProduct };
