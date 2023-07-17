import webpack from 'webpack';
import path from 'path';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';
import {BuildPath} from './config/build/types/config';

// список путей - пути явно нигде не указываем будем передавать как аргумент в функции
const paths: BuildPath = {
    // путь до входа в приложение
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    // путь до папки с билдом === output
    build: path.resolve(__dirname, 'build'),
    // путь до html файлика
    html: path.resolve(__dirname, 'public', 'index.html'),

};
const mode = 'development'
// // isDev === true если mode === development
const isDev = mode === 'development'

const config: webpack.Configuration = buildWebpackConfig({
    mode: 'development',
    // список путей
    paths: paths,
    isDev
});

export default config;
