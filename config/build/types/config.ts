export type BuildMode = 'development' | 'production'

export interface BuildPath {
    entry: string
    // путь до папки со сборкой
    build: string
    html: string
}

// тут конфигурируем конфиг для того чтобы потом задать пути на этапе до сборки чтобы
// не было ошибок при запуске вебпака из-за путеи...
export interface BuildOptions {
    // опции сбокри
    mode: BuildMode
    // пути - путь до entry, output, путь до html - любые пути которые будут
    // испольщзоваться в нашей сборке в нашей конфигурации
    paths: BuildPath
    // isDev === true если mode === development
    isDev: boolean
}
