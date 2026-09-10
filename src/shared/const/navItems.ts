import { getRouteContacts, getRouteControlOrganizations, getRouteDocuments, getRouteNews, getRoutePromotions, getRouteServices, getRouteSpecialists, getRouteUsefulMaterials, getRouteVacancies } from "./router";


export const navItems = [
    { 
        path: getRouteDocuments(), 
        label: 'О клинике', 
        children: [
            { path: getRouteDocuments(), label: 'Нормативные документы', },
            { path: getRouteControlOrganizations(), label: 'Контролирующие организации', },
            { path: getRouteVacancies(), label: 'Вакансии', },
        ],
    },
    { 
        path: getRouteServices(), 
        label: 'Услуги', 
    },
    { 
        path: getRouteSpecialists(), 
        label: 'Специалисты', 
    },
    { 
        path: getRoutePromotions(), 
        label: 'Пациентам', 
        children: [
            { path: getRoutePromotions(), label: 'Акции и скидки', },
            { path: getRouteUsefulMaterials(), label: 'Полезные материалы', },
            { path: getRouteNews(), label: 'Статьи и новости', },
        ],
    },
    { 
        path: getRouteContacts(), 
        label: 'Контакты', 
    },
];