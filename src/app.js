import express from "express";
import routes from "./routes/index.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true}));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Erro Interno do Servidor"
    });
});

export default app;