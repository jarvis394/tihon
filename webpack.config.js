module.exports = {
  mode: 'production',
  module: {
    rules: [
      { test: /\.ts$/, loader: "awesome-typescript-loader" }
    ]
  }
}