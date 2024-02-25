import path from "path";
const __dirname = path.resolve();

export default {
  mode: "production",
  entry: "./server.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "final.js"
  },
  target: "node"
};
