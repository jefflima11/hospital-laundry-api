import express from "express";
import routes from "./routes/index.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true}));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:"Lavanderia Hospitalar MV",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            { BearerAuth: [] }
        ]
    },
    apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(options);

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Erro Interno do Servidor"
    });
});

export default app;