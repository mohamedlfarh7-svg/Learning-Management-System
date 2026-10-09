import express from "express";
import routes from "./routes.js";
import morgan from "morgan";
import  errorHandler  from "./middleware/errorHandler.js";
import  notFound  from "./middleware/notFouond.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(morgan('common'))
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound);
app.use(errorHandler);

export default app;
