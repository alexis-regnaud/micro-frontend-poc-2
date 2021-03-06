const express = require('express');
require('dotenv').config();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT;
const app = express();

app.use(
  createProxyMiddleware('/api/ssr/proxy', {
    target: `${process.env.APP2_URL}/api/ssr`,
    changeOrigin: true,
    pathRewrite: { '^/api/ssr/proxy': '' },
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
