import express from "express";
import path from "path";
import router from "./routes/router.js";
import logger from "./middleware/logger.middleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
