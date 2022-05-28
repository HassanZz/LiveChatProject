const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    static: "dist",
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  entry: ["./src/chat.js", "./src/app.js", "./src/ui.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  watch: true,
};
