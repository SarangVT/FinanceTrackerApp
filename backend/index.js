import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

app.use("*", (req, res) => {
  return res.status(404).json({
    status: "404 Not found",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});