import express, { Application, Request, Response } from "express";
import bookRouter from "./Routes/book.routes";
import dotenv from "dotenv";
import connection from "./config/db";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 7000;

app.use(express.json()); // This line is necessary to parse JSON bodies
app.use("/api", bookRouter); // Prefixing bookRouter with "/api"

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is listening on port ${port}`);
  } catch (err) {
    console.log("err", err);
  }
});
