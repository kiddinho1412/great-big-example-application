const path = require('path');
const webpack = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const helpers = require('./helpers.js');

module.exports = (WATCH) => ({
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            // {
            //     test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', exclude: /node_modules/
            // },
            {
                test: /\.ts$/,
                // removing keepUrl=true fixed error "This test module uses the component StatusBarComponent which is using a "templateUrl" or "styleUrls", but they were never compiled. Please call "TestBed.compileComponents" before your test."
                // loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                // exclude: /node_modules/
            },
            {
                test: /\.(html|css)$/, enforce: 'post',
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/
            },
            {
                test: /\.async\.(html|css)$/,
                loaders: ['file?name=[name].[hash].[ext]', 'extract']
            },
            {
                test: /\.scss$/, enforce: 'post',
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]']
            },
            {
                test: /src[/|\\]main[/|\\]webapp[/|\\].+\.ts$/,
                enforce: 'post',
                exclude: /(test|node_modules)/,
                loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true'
            }]
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src') // location of your src
        ),
        new LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: !WATCH,
                    failOnHint: false
                }
            }
        })
    ]
});
