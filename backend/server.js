const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors
  ({
    origin: "https://contact-management-proj.netlify.app/",
    credentials: true,
  }
));
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
