import express from "express";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { v1 } from "./routes/v1";
import { v2 } from "./routes/v2";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");

// app.use(express.static(path.join(__dirname, "../public")));
app.use(logger("dev"));
app.use("/api/v1", v1);
app.use("/api/v2", v2);

app.use(errorNotFoundHandler);
app.use(errorHandler);
