const env = require(`./src/config/environment`);

module.exports = {
  publicRuntimeConfig: { ...env },
  webpack: function(config) {
    config.externals = config.externals || {};
    config.externals["styletron-server"] = "styletron-server";
    return config;
  },
};
