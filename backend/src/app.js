import express from "express";
import goalsRoutes from "./routes/goal.routes.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", goalsRoutes);

app.use(errorHandler);

export default app;
