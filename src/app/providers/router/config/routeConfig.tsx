import { type RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/MainPage'
import {
    AppRoutes,
    getRouteMain,
    // getRouteUIKit,
    getRouteServices,
    getRouteSpecialists,
    getRoutePromotions,
    getRoutePromotion,
    getRouteNews,
    getRouteNewsArticle,
    getRouteUsefulMaterials,
    getRouteHeartHealthCalc,
    getRouteStopBangQuiz,
    getRouteDepressionScale,
    getRouteDocuments,
    getRouteContacts,
    getRouteVacancies,
    getRouteVacancy,
    getRouteControlOrganizations,
    getRoutePreview,
} from '@/shared/const/router'
import { RouteErrorBoundary } from '../ui/RouteErrorBoundary'
import { ServicesPage } from '@/pages/ServicesPage'
import { SpecialistsPage } from '@/pages/SpecialistsPage'
import { PromotionsPage } from '@/pages/PromotionsPage'
import { PromotionPage } from '@/pages/PromotionPage'
import { NewsPage } from '@/pages/NewsPage'
import { NewsArticlePage } from '@/pages/NewsArticlePage'
import { UsefulMaterialsPage } from '@/pages/UsefulMaterialsPage'
import { HeartHealthCalculatorPage } from '@/pages/HeartHealthCalculatorPage'
import { StopBangQuizPage } from '@/pages/StopBangQuizPage'
import { DepressionScalePage } from '@/pages/DepressionScalePage'
import { DocumentsPage } from '@/pages/DocumentsPage'
import { ContactsPage } from '@/pages/ContactsPage'
import { VacanciesPage } from '@/pages/VacanciesPage'
import { VacancyPage } from '@/pages/VacancyPage'
import { ControlOrganizationsPage } from '@/pages/ControlOrganizationsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PreviewRedirect } from '@/pages/PreviewRedirect'

export const routeConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.SERVICES]: {
        path: getRouteServices(),
        element: <ServicesPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.SPECIALISTS]: {
        path: getRouteSpecialists(),
        element: <SpecialistsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.PROMOTIONS]: {
        path: getRoutePromotions(),
        element: <PromotionsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.PROMOTION]: {
        path: getRoutePromotion(':slug'),
        element: <PromotionPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.NEWS]: {
        path: getRouteNews(),
        element: <NewsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.NEWS_ARTICLE]: {
        path: getRouteNewsArticle(':slug'),
        element: <NewsArticlePage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.USEFUL_MATERIALS]: {
        path: getRouteUsefulMaterials(),
        element: <UsefulMaterialsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.HEART_HEALTH_CALC]: {
        path: getRouteHeartHealthCalc(),
        element: <HeartHealthCalculatorPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.STOP_BANG_QUIZ]: {
        path: getRouteStopBangQuiz(),
        element: <StopBangQuizPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.DEPRESSION_SCALE]: {
        path: getRouteDepressionScale(),
        element: <DepressionScalePage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.DOCUMENTS]: {
        path: getRouteDocuments(),
        element: <DocumentsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.CONTACTS]: {
        path: getRouteContacts(),
        element: <ContactsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.VACANCIES]: {
        path: getRouteVacancies(),
        element: <VacanciesPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.VACANCY]: {
        path: getRouteVacancy(':slug'),
        element: <VacancyPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.CONTROL_ORGANIZATIONS]: {
        path: getRouteControlOrganizations(),
        element: <ControlOrganizationsPage />,
        errorElement: <RouteErrorBoundary />,
    },
    [AppRoutes.PREVIEW]: {
        path: getRoutePreview(),
        element: <PreviewRedirect />,
        errorElement: <RouteErrorBoundary />,
    },
    // [AppRoutes.UI_KIT]: {
    //     path: getRouteUIKit(),
    //     element: <UIKitPage />,
    //     errorElement: <RouteErrorBoundary />,
    // },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
        errorElement: <RouteErrorBoundary />,
    },
}

export const router = createBrowserRouter(Object.values(routeConfig))