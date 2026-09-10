export type BuildMode = 'production' | 'development'
export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    favicon: string;
    src: string;
    locales: string;
    buildLocales: string;
}

export interface BuildEnv {
    emailJSPublicKey: string;
    emailJSVacancyTemplateId: string;
    emailJSRequestTemplateId: string;
    emailJSServiceId: string;
    previewSecret: string;
    ymapKey: string;
    token: string;
    mode: BuildMode;
    port: number;
    apiUrl: string;
    strapiURL: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    strapiURL: string;
    ymapKey: string;
    emailJSPublicKey: string;
    emailJSVacancyTemplateId: string;
    emailJSRequestTemplateId: string;
    emailJSServiceId: string;
    previewSecret: string;
    project: 'storybook' | 'jest' | 'main';
}
