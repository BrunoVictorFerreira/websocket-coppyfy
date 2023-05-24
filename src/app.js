import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { CorsFunction } from "./config/cors";

const { corsOptionsDelegate } = CorsFunction();

const app = express();

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.get("*", cors(corsOptionsDelegate), function (req, res, next) {
  res.status(403).json("This is CORS-enabled for just allowed domains.");
});

export default app;
