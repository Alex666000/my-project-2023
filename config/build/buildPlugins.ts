import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import {BuildOptions} from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
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
        // с помощью этого плагина в само приложение можно прокидывать глобальные переменные
        // назовем эти глобалье переменные сборки с 2 подчеркиваниями и большими буквами
        // чтобы отделять их от переменных  которые мы используем в самом приложении
        // мы ей присваиваем:.. и она нам будет доступна в коде Арр
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ];
}
