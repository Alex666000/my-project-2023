import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // чтобы не генерировать css файлы в режиме разработки
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        // для каких файлов определять модули по регулярке
                        // Boolean() - вернет true
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        // названия
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                    },
                }
            },
            'sass-loader',
        ]
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}
