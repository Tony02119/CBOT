const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/chatbot',
    createProxyMiddleware({
      target: 'http://localhost:5006',
      changeOrigin: true,
      pathRewrite: {
        '^/api/chatbot': '/webhooks/rest/webhook',
      },
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
        res.status(500).json({ error: 'Chatbot service unavailable' });
      },
    })
  );
};