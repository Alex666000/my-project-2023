import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPath } from './config/build/types/config';

export default (env: BuildEnv) => {
    // список путей - пути явно нигде не указываем будем передавать как аргумент в функции
    const paths: BuildPath = {
        // путь до входа в приложение
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        // путь до папки с билдом === output
        build: path.resolve(__dirname, 'build'),
        // путь до html файлика
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),

    };

    const mode = env.mode || 'development';

    // isDev === true если mode === development
    const isDev = mode === 'development';

    // из вне порт задаем по умолчанию 3000
    const PORT = env.port || 3000;

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        // список путей
        paths,
        isDev,
        port: PORT,
    });

    return config;
};
