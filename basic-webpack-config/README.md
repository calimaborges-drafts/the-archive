# basic-webpack-config

## Usage

```javascript
//# file: webpack.config.js
const basicWebpackConfig = require("basic-webpack-config");

module.exports = Object.assign(basicWebpackConfig()), {
    // ovewrite or insert new webpack configs
});
```

## Generated webpack

```javascript
{ 
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist/")
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: "dist/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8000,
        historyApiFallback: true,
        noInfo: false,
        stats: "minimal",
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
```