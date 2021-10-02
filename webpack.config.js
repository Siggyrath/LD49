const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: ["src", "node_modules"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|bmp)$/,
                use: [{
                  loader: 'file-loader',
                  options: {
                    emitFile: true
                  }
                }]
            }
        ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 4200,
      index: 'index.html'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src', 'assets'),
            to: 'assets'
        }]),
    ]
};