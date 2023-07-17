import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import {BuildOptions} from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            // какие названия будут у файлов и где они будут располагаться -
            // аналогично тому что указывали в output
            filename: 'css/[name].[contenthash:8].css',
            // когда будем разбивать файлы на асинхронные и будут появляться отдельные
            // чанки
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ];
}
