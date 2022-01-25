const fs = require("fs");

class Persist {
  constructor(path) {
    this.path = path;
  }

  async open() {
    let data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async getLastId() {
    let lastId = await this.open();
    return lastId.length + 1;
  }

  async save(data) {
    data.id = await this.getLastId();
    let dataExist = await this.open();
    dataExist.push(data);
    await fs.promises.writeFile(this.path, JSON.stringify(dataExist));
    return data.id;
  }

  async delete(id) {
    let data = await this.open();
    let newData = data.filter((product) => product.id != parseInt(id));
    await fs.promises.writeFile(this.path, JSON.stringify(newData));
    return `producto con id ${id} eliminado`;
  }

  async modify(id, data) {
    let existData = await this.open();
    let index = existData.findIndex((data) => data.id === parseInt(id));
    existData[index].name = data.name;
    existData[index].description = data.description;
    existData[index].code = data.code;
    existData[index].price = data.price;
    existData[index].stock = data.stock;
    await fs.promises.writeFile(this.path, JSON.stringify(existData));
    return `producto con id ${id} modificado con exito`;
  }
}

module.exports = Persist;