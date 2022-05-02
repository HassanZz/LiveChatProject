const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/chat.js", "./src/app.js", "./src/ui.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
};
