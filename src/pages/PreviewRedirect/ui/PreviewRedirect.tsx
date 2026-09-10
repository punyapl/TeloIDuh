// pages/PreviewRedirect/PreviewRedirect.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PreviewRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const secret = searchParams.get('secret');
        const path = searchParams.get('path');
        const status = searchParams.get('status');

        if (secret !== __PREVIEW_SECRET__) {
            navigate('/', { replace: true });
            return;
        }

        // сохраняем факт preview-режима, чтобы дочерние страницы
        // знали, что нужно запрашивать draft
        sessionStorage.setItem('previewStatus', status ?? 'published');

        navigate(path ?? '/', { replace: true });
    }, [searchParams, navigate]);

    return null;
};