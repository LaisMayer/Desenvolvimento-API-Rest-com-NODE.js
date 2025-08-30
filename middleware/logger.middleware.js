// Middleware simples para logar cada requisição
module.exports = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);
  next();
};
