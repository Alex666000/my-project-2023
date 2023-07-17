import {BuildOptions} from '../build/types/config';
import webpack from 'webpack';
import {buildPlugins} from './buildPlugins';
import {buildLoaders} from './buildLoaders';
import {buildResolve} from './buildResolve';
import {buildDevServer} from './buildDevServer';

// Конфигурирует конфиг - основной конфиг - Сюда добавляем все плагины и лоадеры
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: paths.build,
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolve(),
        // добавили source-map - чтобы четко видеть в коде где произошла ошибка
        // если isDev те === разработки режим... - то source-map добавляем
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev? buildDevServer(options) : undefined,
    }
}
