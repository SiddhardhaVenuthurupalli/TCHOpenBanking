const PROXY_CONFIG = [
  {
    context: ['/proxy'],
    target: 'http://127.0.0.1:5000',
    pathRewrite: { '^/proxy': '' },
    changeOrigin: true,
    secure: false,
    bypass: function (req, res, proxyOptions) {
      const targetIp = req.headers['x-target-ip'];
      if (targetIp) {
        proxyOptions.target = `http://${targetIp}:5000`;
      }
    }
  }
];

module.exports = PROXY_CONFIG;
