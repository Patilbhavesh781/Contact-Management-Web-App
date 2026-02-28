const dotenv = require("dotenv");
const connectDB = require("../config/db");
const app = require("../app");

dotenv.config();

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
};
