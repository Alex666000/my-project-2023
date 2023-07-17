import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {
    const typescriptLoader = {
        // находим файлы которые надо пропустить через лоадер
        test: /\.tsx?$/,
        use: 'ts-loader',
        // исключаем поиск в...
        exclude: /node_modules/,
    };

    return [
        typescriptLoader,
    ];
}
