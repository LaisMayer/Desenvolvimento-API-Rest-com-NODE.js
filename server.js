const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/router.js");

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.static("public"));

// Rotas
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
