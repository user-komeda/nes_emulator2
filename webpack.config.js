const path = require("path");

module.exports = {
  entry: [
    "./src/index.ts",
    "webpack-dev-server/client?http://localhost:8888",
    "webpack/hot/only-dev-server",
  ], //最初に読み込ませるファイルもtsファイルに変更

  output: {
    filename: "bundle2.js",
    path: path.resolve(__dirname, "static"),
    publicPath: "/static/",
  },
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/, //どういうファイルに対して
        use: "ts-loader", //何をするか
        exclude: /node_modules/, //このファイルは例外
      },
    ],
  },
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "static"),
    },
  },
};
