// widgets/CookieBanner/ui/CookieBanner.tsx

import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useModal } from '@/shared/hooks/useModal';
import { useCookieConsent } from '../model/useCookieConsent';
import { CookieSettingsModal } from './CookieSettingsModal';
import { Button } from '@/shared/ui/Button';

export const CookieBanner = () => {
    const { consent, isReady, acceptAll, rejectOptional, saveConsent } = useCookieConsent();
    const settingsModal = useModal();

    const isVisible = isReady && !consent;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-md border-t border-design-elements"
                >
                        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                            <p className="font-p-sm text-text-primary leading-normal">
                                Мы используем файлы cookie для корректной работы сайта и аналитики. <br/>
                            Продолжая пользоваться сайтом, вы соглашаетесь с{' '}
                            <Link
                                to="https://api.teloiduh.ru/uploads/privacy_policy_f0272bf9c3.pdf"
                                className="text-accent underline! underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Политикой обработки персональных данных
                            </Link>
                            .
                            </p>

                            <div className="flex shrink-0 flex-wrap items-center gap-3">
                                <Button size='small' theme='default' text='Настроить' onClick={() => settingsModal.open()} />
                                <Button size='small' theme='default' text='Отклонить необязательные' onClick={rejectOptional} />
                                <Button size='small' theme='default' text='Принять все' onClick={acceptAll} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CookieSettingsModal
                isOpen={settingsModal.show}
                onClose={settingsModal.close}
                initialConsent={consent}
                onSave={saveConsent}
            />
        </>
    );
};