import webpack from 'webpack';
import { BuildOptions } from '../build/types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildDevServer } from './buildDevServer';
import { buildResolvers } from './buildResolve';

// Конфигурирует конфиг - основной конфиг - Сюда добавляем все плагины и лоадеры
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        // добавили source-map - чтобы четко видеть в коде где произошла ошибка
        // если isDev те === разработки режим... - то source-map добавляем
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
