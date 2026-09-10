export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth', });
};

// Для использования с anchor-ссылками
export const scrollToSectionFromLink = (
    e: React.MouseEvent<HTMLAnchorElement>, 
    path: string
) => {
    e.preventDefault();
    scrollToSection(path);
};