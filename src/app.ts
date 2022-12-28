
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/error-models";
import dal from "./2-utils/dal";
import controller from "./6-controllers/controllers";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", controller);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new RouteNotFoundError(request.method, request.originalUrl));
});

server.use(catchAll);

server.listen(config.port, () => {
    dal.connect()
    console.log(`Listening on http://localhost:${config.port}`)
});