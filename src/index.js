import express from "express";
import errorHandler from "./middleware/error.ts";
import { commentsRouter } from "./router/index.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/v1/comments", commentsRouter);
app.use(errorHandler);

app.listen(8002, () => {
  console.log("Server is running on port 8002");
});
