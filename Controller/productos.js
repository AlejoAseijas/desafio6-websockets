const { json } = require("express");

let productos = [
  {
    title: "Vans Rv7",
    price: 20000,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Vans.rv-7.g-kels.arp.jpg",
    id: 1,
  },
  {
    title: "Rans S10",
    price: 20000,
    thumbnail:
      "https://i.pinimg.com/736x/47/b1/5c/47b15ccf808744087c10b94ed605a4cf--pictures-photos.jpg",
    id: 2,
  },
];

class Productos {
  constructor() {}
  get() {
    return productos;
  }
  getById(id) {
    try {
      let productSelect = productos.find((item) => {
        return item.id === parseInt(id);
      });
      productSelect === undefined
        ? (productSelect = "id invalido")
        : productSelect;
      return productSelect;
    } catch (err) {
      return err;
    }
  }
  post(bodyData) {
    try {
      let lastId = productos.length + 1;
      bodyData.id = lastId;
      productos.push(bodyData);
      return bodyData;
    } catch (err) {
      return err;
    }
  }
  put(id, bodyData) {
    try {
      let status = "product-edited";
      let productFind = productos.find((item) => {
        return item.id === parseInt(id);
      });
      if (productFind === undefined) {
        status = "id invalido";
      } else {
        productFind.title = bodyData.title;
        productFind.price = bodyData.price;
        productFind.thumbnail = bodyData.thumbnail;
        let indexProd = productos.findIndex((item) => item.id === parseInt(id));
        productos[indexProd] = productFind;
      }
      return status;
    } catch (err) {
      return err;
    }
  }
  delete(id) {
    try {
      let status = productos.find((item) => {
        return item.id === parseInt(id);
      });
      if (status === undefined) {
        status = "id invalido";
      } else {
        let indexProd = productos.findIndex((item) => item.id === parseInt(id));
        productos.splice(indexProd, 1);
        status = "producto-eliminado";
      }
      return status;
    } catch (err) {}
  }
}

module.exports = Productos;
