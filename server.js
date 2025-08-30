const express = require("express");
const path = require("path");
const router = require("./routes/router");
const logger = require("./middleware/logger.middleware");

const app = express();
app.use(express.json());
app.use(logger); // Middleware simples
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
