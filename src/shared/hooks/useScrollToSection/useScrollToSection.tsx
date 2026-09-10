import { useLocation, useNavigate } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { scrollToSection } from '@/shared/lib/scrollToSection';

export const useScrollToSection = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (sectionId: string) => {
        const id = sectionId.replace('#', '');

        if (pathname !== getRouteMain()) {
            navigate(getRouteMain(), { state: { scrollTo: id } });
        } else {
            scrollToSection(sectionId);
        }
    };
};