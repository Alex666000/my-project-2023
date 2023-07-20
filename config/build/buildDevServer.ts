import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(option: BuildOptions): DevServerConfiguration {
    return {
        port: option.port,
        // автоматически флаг открывает в браузеоре страницу с нашим приложением
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
