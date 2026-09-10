import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BundleAnalyzerPlugin, } from 'webpack-bundle-analyzer'
import { type BuildOptions, } from './types/config'

export function buildPlugins ({
    paths, 
    isDev, 
    project, 
    strapiURL, 
    ymapKey, 
    emailJSServiceId, 
    emailJSRequestTemplateId, 
    emailJSVacancyTemplateId, 
    emailJSPublicKey,
    previewSecret,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev

    const plugins: webpack.WebpackPluginInstance[] = [
        new HTMLWebpackPlugin({
            template: paths.html,
            favicon: paths.favicon,
            templateParameters: {},
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: isDev,
            __STRAPI_URL__: JSON.stringify(strapiURL),
            __YMAPKEY__: JSON.stringify(ymapKey),
            __EMAILJS_SERVICE_ID__: JSON.stringify(emailJSServiceId),
            __EMAILJS_REQUEST_TEMPLATE_ID__: JSON.stringify(emailJSRequestTemplateId),
            __EMAILJS_VACANCY_TEMPLATE_ID__: JSON.stringify(emailJSVacancyTemplateId),
            __EMAILJS_PUBLIC_KEY__: JSON.stringify(emailJSPublicKey),
            __PREVIEW_SECRET__: JSON.stringify(previewSecret),
        }),
    ]
    
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }))
        plugins.push(new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }))
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
    }

    plugins.push(new CopyPlugin({
        patterns: [
            { from: 'public/robots.txt', to: 'robots.txt', },
            { from: 'public/Политика конфиденциальности.pdf', to: 'Политика конфиденциальности.pdf', },
        ],
    }))

    return plugins
}
