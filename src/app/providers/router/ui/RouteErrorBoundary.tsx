import { NotFoundPage } from '@/pages/NotFoundPage'
import { useRouteError, } from 'react-router'
import { isRouteErrorResponse, } from 'react-router-dom'
// import { ErrorPage, } from '@/pages/ErrorPage'
// import { NotFoundPage, } from '@/pages/NotFoundPage'

export const RouteErrorBoundary = () => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        console.error(error)
        if (error.status === 404) {
            return <NotFoundPage />
        }

        return <NotFoundPage />
    } else {
        return <div>Ой... Попробуйте зайти на сайт позже</div>
    }
}
