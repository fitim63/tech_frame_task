// config-overrides.js
module.exports = function override(config, env) {
  let loaders = config.module.rules[1].oneOf;
  loaders.splice(loaders.length - 1, 0, {
    test: /\.scss$/,
    use: ["style-leader", "css-loader", "sass-loader"],
  });
  return config;
};
