import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";

import indexRouter from "./routes/index.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

const app = express();
const PORT = process.env.HTTP_PORT;

const corsOptions = {
    origin: "http://localhost:3001",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(
    cookieSession({
        name: "vidyan-session",
        keys: ["COOKIE_SECRET_KEYS"],
        secret: "COOKIE_SECRET",
        httpOnly: true,
    })
);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
