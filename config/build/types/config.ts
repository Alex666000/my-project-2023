export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    apiUrl: string // глобальная переменная урла сервера
    port: number;
    project: 'storybook' | 'frontend' | 'jest'; // будем разделять среды в которых  у нас выполняется код
}
