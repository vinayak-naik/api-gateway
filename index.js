const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 4000;

// Define routes and their corresponding backend services
const routes = [
  { path: '/auth', target: process.env.AUTH_SERVICE || 'http://localhost:4001' },
  { path: '/user', target: process.env.USER_SERVICE || 'http://localhost:4002' },
  // Add more routes as needed
];

// Set up proxy middleware for each route
routes.forEach((route) => {
  app.use(route.path, createProxyMiddleware({ target: route.target, changeOrigin: true }));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
