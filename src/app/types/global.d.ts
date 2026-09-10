declare module '*.scss' {
    type IClassNames = Record<string, string>

    const classNames: IClassNames
    export = classNames
}
declare module '*.css'

declare module '*.svg' {
    import { type ReactElement, type SVGProps, } from 'react'

    const content: (props: SVGProps<SVGElement>) => ReactElement
    export default content
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.webp';

declare module '*.mp4';
declare module '*.webm';

declare module '*.pdf';

declare const __STRAPI_URL__: string
declare const __YMAPKEY__: string
declare const __EMAILJS_SERVICE_ID__: string
declare const __EMAILJS_REQUEST_TEMPLATE_ID__: string
declare const __EMAILJS_VACANCY_TEMPLATE_ID__: string
declare const __EMAILJS_PUBLIC_KEY__: string
declare const __PREVIEW_SECRET__: string