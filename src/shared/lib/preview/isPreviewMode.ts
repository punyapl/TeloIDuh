export const isPreviewMode = (): boolean => {
    return sessionStorage.getItem('previewStatus') === 'draft'
}