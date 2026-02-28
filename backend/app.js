const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "https://contact-management-proj.netlify.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Contact API is running" });
});

app.use("/api/contacts", require("./routes/contactRoutes"));

module.exports = app;
