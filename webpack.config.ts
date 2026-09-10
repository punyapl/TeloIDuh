import path from "path"
import { type Configuration } from "webpack"
import { config, } from 'dotenv'
import { buildWebpackConfig, } from './config/build/buildWebpackConfig'
import { type BuildEnv, type BuildPaths, } from './config/build/types/config'

export default (env: BuildEnv): Configuration => {
	const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    }

	const mode = env.mode || "development"
	const PORT = env.port || 3000
	const isDev = mode === "development"
    const strapiURL = env?.strapiURL ?? config().parsed?.strapiURL ?? ''
    const ymapKey = env?.ymapKey ?? config().parsed?.ymapKey ?? ''
    const emailJSServiceId = env?.emailJSServiceId ?? config().parsed?.emailJSServiceId ?? ''
    const emailJSRequestTemplateId = env?.emailJSRequestTemplateId ?? config().parsed?.emailJSRequestTemplateId ?? ''
    const emailJSVacancyTemplateId = env?.emailJSVacancyTemplateId ?? config().parsed?.emailJSVacancyTemplateId ?? ''
    const emailJSPublicKey = env?.emailJSPublicKey ?? config().parsed?.emailJSPublicKey ?? ''
    const previewSecret = env?.previewSecret ?? config().parsed?.previewSecret ?? ''

	return buildWebpackConfig({
        mode,
        paths,
        isDev,
        strapiURL,
        ymapKey,
        emailJSServiceId,
        emailJSRequestTemplateId,
        emailJSVacancyTemplateId,
        emailJSPublicKey,
        previewSecret,
        port: PORT,
        project: 'main',
    })
}
