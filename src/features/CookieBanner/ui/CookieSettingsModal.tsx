// widgets/CookieBanner/ui/CookieSettingsModal.tsx

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CookieCategories, CookieConsent } from '../model/types';
import { Button } from '@/shared/ui/Button';

interface CookieSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialConsent: CookieConsent | null;
    onSave: (categories: CookieCategories) => void;
}

export const CookieSettingsModal = ({
    isOpen,
    onClose,
    initialConsent,
    onSave,
}: CookieSettingsModalProps) => {
    const [analytics, setAnalytics] = useState(initialConsent?.analytics ?? true);
    const [marketing, setMarketing] = useState(initialConsent?.marketing ?? false);

    useEffect(() => {
        if (isOpen) {
            setAnalytics(initialConsent?.analytics ?? true);
            setMarketing(initialConsent?.marketing ?? false);
        }
    }, [isOpen, initialConsent]);

    const handleSave = () => {
        onSave({ analytics, marketing });
        onClose();
    };

    const handleAcceptAll = () => {
        onSave({ analytics: true, marketing: true });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[520px] rounded-[20px] bg-background p-6"
                    >
                        <h2 className="font-h3 mb-2 text-heading">Настройки cookie</h2>
                        <p className="font-p-md mb-6 text-text-primary">
                            Выберите, какие категории cookie можно использовать. Подробнее — в{' '}
                            <Link
                                to="https://api.teloiduh.ru/uploads/privacy_policy_f0272bf9c3.pdf"
                                className="text-accent underline! underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Политике обработки персональных данных
                            </Link>
                            .
                        </p>

                        <div className="mb-6 flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                                <div className="flex flex-col gap-2">
                                    <p className="font-lbl text-text-primary">Необходимые</p>
                                    <p className="font-p-sm text-text-secondary">
                                        Обеспечивают базовую работу сайта. Отключить нельзя.
                                    </p>
                                </div>
                                <Checkbox checked disabled onChange={() => {}} />
                            </div>

                            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                                <div className="flex flex-col gap-2">
                                    <p className="font-lbl text-text-primary">Аналитические</p>
                                    <p className="font-p-sm text-text-secondary">
                                        Яндекс.Метрика и аналоги — помогают улучшать сайт.
                                    </p>
                                </div>
                                <Checkbox
                                    checked={analytics}
                                    onChange={() => setAnalytics((prev) => !prev)}
                                />
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="font-lbl text-text-primary">Маркетинговые</p>
                                    <p className="font-p-sm text-text-secondary">
                                        Используются для персонализации рекламы.
                                    </p>
                                </div>
                                <Checkbox
                                    checked={marketing}
                                    onChange={() => setMarketing((prev) => !prev)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button size='small' theme='default' text='Сохранить выбор' onClick={handleSave} className='w-full'/>
                            <Button size='small' theme='default' text='Принять все' onClick={handleAcceptAll} className='w-full'/>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};