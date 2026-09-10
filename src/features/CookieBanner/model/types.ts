export interface CookieConsent {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    timestamp: string;
    version: string;
}

export interface CookieCategories {
    analytics: boolean;
    marketing: boolean;
}