const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(createProxyMiddleware("/token", { target: "http://localhost:8081" }));
  app.use(
    createProxyMiddleware("/apiKey", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/firebase-url", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/post/interview", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/post/interview/*", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/get/interview/**", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/delete/interviewers", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/delete/interview/**", { target: "http://localhost:8081" })
  );
  app.use(
    createProxyMiddleware("/update/interview/**", { target: "http://localhost:8081" })
  );
};
