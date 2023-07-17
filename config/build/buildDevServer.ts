import {BuildOptions} from './types/config';
import {Configuration as DevServerConfiguration} from 'webpack-dev-server';

export function buildDevServer(option: BuildOptions): DevServerConfiguration {
    return {
        port: option.port,
        // автоматически флаг открывает в браузеоре страницу с нашим приложением
        open: true,
    }
}
