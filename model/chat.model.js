const fs = require("fs").promises;

class Chat {
  constructor() {
    this.chats = [];
  }

  async add(message) {
    try {
      this.chats.push(message);
      await fs.writeFile("../chats.json", JSON.stringify(this.chats));
    } catch (err) {
      return err;
    }
  }

  async get() {
    try {
      const chatStored = await fs.readFile("../chats.json", "utf-8");

      this.chats = JSON.parse(chatStored);
      return this.chats;
    } catch (err) {
      await fs.writeFile("../chats.json", JSON.stringify(this.chats));
      return err;
    }
  }
}
module.exports = Chat;
