// widgets/CookieBanner/model/useCookieConsent.ts

import { useCallback, useEffect, useState } from 'react';
import { CookieCategories, CookieConsent } from './types';
import { disableYandexMetrika, loadYandexMetrika } from '@/shared/lib/analytics/yandexMetrika';

const COOKIE_CONSENT_KEY = 'cookie-consent';
const CONSENT_VERSION = '1.0'; // менять при существенном изменении cookie-политики

export const useCookieConsent = () => {
    const [consent, setConsent] = useState<CookieConsent | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);

        if (stored) {
            try {
                const parsed = JSON.parse(stored) as CookieConsent;
                if (parsed.version === CONSENT_VERSION) {
                    setConsent(parsed);
                }
            } catch {
                // повреждённые данные — считаем, что согласия нет
            }
        }

        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!consent) return;

        if (consent.analytics) {
            loadYandexMetrika();
        } else {
            disableYandexMetrika();
        }
    }, [consent]);

    const saveConsent = useCallback((categories: CookieCategories) => {
        const newConsent: CookieConsent = {
            necessary: true,
            analytics: categories.analytics,
            marketing: categories.marketing,
            timestamp: new Date().toISOString(),
            version: CONSENT_VERSION,
        };

        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
        setConsent(newConsent);

        // TODO: при необходимости — отправить лог согласия в Strapi
        // (дата, категории, версия политики) для доказательной базы перед РКН
    }, []);

    const acceptAll = useCallback(
        () => saveConsent({ analytics: true, marketing: true }),
        [saveConsent],
    );

    const rejectOptional = useCallback(
        () => saveConsent({ analytics: false, marketing: false }),
        [saveConsent],
    );

    return { consent, isReady, saveConsent, acceptAll, rejectOptional };
};