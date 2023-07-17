import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from js strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
        ]
    }

    const typescriptLoader = {
        // находим файлы которые надо пропустить через лоадер
        test: /\.tsx?$/,
        use: 'ts-loader',
        // исключаем поиск в...
        exclude: /node_modules/,
    };

    return [
        // очередность лоадеров важна!
        typescriptLoader,
        cssLoader
    ];
}
