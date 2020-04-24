import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import env from "./config/environment";
import "./mongoose";

import userRouter from "./api/v1/routes/user";

const { CORS_ORIGIN_WHITELIST, PORT } = env;
const port = process.env.PORT || PORT;
const POST_LIMIT = `50mb`;

const corsOptions = {
  origin(origin: any, callback: any) {
    if (CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`${origin} is not allowed by CORS.`);
      callback(new Error(`Not allowed by CORS`));
    }
  },
};

const app = express();

app.use(morgan("combined"));

app.use(
  bodyParser.json({
    limit: POST_LIMIT,
  })
);

app.use(bodyParser.urlencoded({ limit: POST_LIMIT, extended: true }));

app.use(cors(corsOptions));

app.use("/api/v1/user", userRouter);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send({ message: "ok" });
});

app.listen(port, () => {
  return console.log(`App server started on port ${port} 🎉`);
});
