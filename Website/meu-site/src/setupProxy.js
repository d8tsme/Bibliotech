const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy authentication requests to the API to avoid CORS in development
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://kelsi-scrobiculate-dina.ngrok-free.dev',
      changeOrigin: true,
      secure: false,
    })
  );

  // Optionally proxy other API paths you use during dev:
  app.use(
    ['/autores', '/books', '/livros', '/pessoas', '/emprestimos', '/generos'],
    createProxyMiddleware({
      target: 'https://kelsi-scrobiculate-dina.ngrok-free.dev',
      changeOrigin: true,
      secure: false,
    })
  );
};
