export enum AppRoutes {
    MAIN = 'main',
    SERVICES = 'services',
    SPECIALISTS = 'specialists',
    // UI_KIT = 'ui_kit',
    PROMOTIONS = 'promotions',
    PROMOTION = 'promotion',
    NEWS = 'news',
    NEWS_ARTICLE = 'news_article',
    USEFUL_MATERIALS = 'useful_materials',
    HEART_HEALTH_CALC = 'heart_health_calc',
    STOP_BANG_QUIZ = 'stop_bang_quiz',
    DEPRESSION_SCALE = 'depression_scale',
    DOCUMENTS = 'documents',
    CONTACTS = 'contacts',
    VACANCIES = 'vacancies',
    VACANCY = 'vacancy',
    CONTROL_ORGANIZATIONS = 'control_organizations',
    PREVIEW = 'preview',
    // last
    NOT_FOUND = 'not_found'
}

// export const getRouteUIKit = () => '/ui-kit'
export const getRouteMain = () => '/'
export const getRouteServices = () => '/services'
export const getRouteSpecialists = () => '/specialists'
export const getRoutePromotions = () => '/promo'
export const getRoutePromotion = (slug: string) => `/promo/${slug}`
export const getRouteNews = () => '/news'
export const getRouteNewsArticle = (slug: string) => `/news/${slug}`
export const getRouteUsefulMaterials = () => '/useful'
export const getRouteHeartHealthCalc = () => '/useful/heart-health-calculator'
export const getRouteStopBangQuiz = () => '/useful/stop-bang-quiz'
export const getRouteDepressionScale = () => '/useful/depression-scale'
export const getRouteDocuments = () => '/documents'
export const getRouteContacts = () => '/contacts'
export const getRouteVacancies = () => '/vacancies'
export const getRouteVacancy = (slug: string) => `/vacancy/${slug}`
export const getRouteControlOrganizations = () => '/control-organizations'
export const getRoutePreview = () => '/preview'

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteServices()]: AppRoutes.SERVICES,
    [getRouteSpecialists()]: AppRoutes.SPECIALISTS,
    [getRoutePromotions()]: AppRoutes.PROMOTIONS,
    [getRoutePromotion(':slug')]: AppRoutes.PROMOTION,
    [getRouteNews()]: AppRoutes.NEWS,
    [getRouteNewsArticle(':slug')]: AppRoutes.NEWS_ARTICLE,
    [getRouteUsefulMaterials()]: AppRoutes.USEFUL_MATERIALS,
    [getRouteHeartHealthCalc()]: AppRoutes.HEART_HEALTH_CALC,
    [getRouteStopBangQuiz()]: AppRoutes.STOP_BANG_QUIZ,
    [getRouteDepressionScale()]: AppRoutes.DEPRESSION_SCALE,
    [getRouteDocuments()]: AppRoutes.DOCUMENTS,
    [getRouteContacts()]: AppRoutes.CONTACTS,
    [getRouteVacancies()]: AppRoutes.VACANCIES,
    [getRouteVacancy(':slug')]: AppRoutes.VACANCY,
    [getRouteControlOrganizations()]: AppRoutes.CONTROL_ORGANIZATIONS,
    [getRoutePreview()]: AppRoutes.PREVIEW,
    // [getRouteUIKit()]: AppRoutes.UI_KIT,
}