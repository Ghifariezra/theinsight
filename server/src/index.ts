import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import helmet from "helmet";
import { connectDB } from "./config/db";
import { requestLogger } from "./middleware/logger";
import oauthRouter from "./routes/oauthRouter";
import userRouter from "./routes/userRouter";
import blogRouter from "./routes/blogRouter";
import {
    csrfProtection,
    sendCsrfToken
} from "./middleware/csrfProtection";

const app = express();
const PORT = process.env.PORT!;

app.use(express.json({
    limit: "10mb"
}));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

connectDB();

app.use(requestLogger);

app.use(csrfProtection);
app.get("/api/csrf-token", sendCsrfToken);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.use("/auth/google", oauthRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
