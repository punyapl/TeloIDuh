import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";

import PaperPlane from '@/shared/assets/icons/PaperPlane.svg';
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button";
import { TextInput } from "@/shared/ui/TextInput";
import { PhoneInput } from "@/shared/ui/PhoneInput";

import { vacancyValidations } from '../model';
import { sanitizeString } from '@/shared/lib/formSanitizer';
import { SuccessModal } from '@/widgets/SuccessModal';
import { FailureModal } from '@/widgets/FailureModal';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Link } from 'react-router';

interface VacancyFormProps {
    vacancyTitle: string;
}

type VacancyFormValues = {
    name: string;
    phone: string;
    message?: string;
    consent: boolean;
};

export const VacancyForm = ({ vacancyTitle }: VacancyFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<VacancyFormValues>({
        mode: 'onBlur',
        shouldFocusError: true,
        defaultValues: {
            name: '',
            phone: '',
            message: '',
            consent: false
        }
    });

    const [isSending, setIsSending] = useState(false);
    
    const successModal = useModal();
    const failureModal = useModal();

    const onSubmit = async (data: VacancyFormValues) => {
        if (isSending) return;
        setIsSending(true);

        try {
            const sanitizedData = {
                vacancy: vacancyTitle,
                fullname: sanitizeString(data.name),
                phone: data.phone,
                message: sanitizeString(data.message || '')
            };

            await emailjs.send(
                __EMAILJS_SERVICE_ID__!,
                __EMAILJS_VACANCY_TEMPLATE_ID__!,
                sanitizedData,
                __EMAILJS_PUBLIC_KEY__!
            );

            reset();
            successModal.open();
        } catch (err) {
            console.error("Ошибка отправки:", err);
            failureModal.open();
        } finally {
            setIsSending(false);
        }
    };

    const handleSuccessClose = () => {
        successModal.close();
        setTimeout(() => clearErrors(), 100);
    };

    return (
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                noValidate
                className="flex flex-col gap-[40px] w-full bg-white rounded-[5px] p-[64px] border border-background-secondary max-w-[960px]"
            >
                <div>
                    <h2 className="font-h2 text-heading w-full uppercase mb-2">
                        ОТКЛИК И ЗАЯВКА <br/><span className="text-accent">НА ОБРАТНЫЙ ЗВОНОК</span>
                    </h2>
                    <p className="font-sub text-text-primary w-full uppercase">
                        НАПИШИТЕ НАМ О ВАШЕЙ ГОТОВНОСТИ К СОБЕСЕДОВАНИЮ
                    </p>
                </div>

                <div className="flex flex-col gap-[30px] w-full">
                    <TextInput 
                        label="Выбранная вакансия" 
                        type="text" 
                        placeholder="Название вакансии" 
                        disabled 
                        value={vacancyTitle} 
                    />
                    
                    <TextInput 
                        label="ФИО" 
                        type="text" 
                        placeholder="Иван" 
                        required 
                        {...register("name", vacancyValidations.name)}
                        error={errors.name?.message}
                    />
                    
                    <Controller
                        name="phone"
                        control={control}
                        rules={vacancyValidations.phone}
                        render={({ field }) => (
                            <PhoneInput
                                label="телефон"
                                placeholder="+7 (___) ___-__-__"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.phone?.message}
                            />
                        )}
                    />
                    
                    <TextInput 
                        label="Сопроводительный комментарий" 
                        type="text" 
                        placeholder="Комментарий..." 
                        {...register("message", vacancyValidations.message)}
                        error={errors.message?.message}
                    />
                </div>

                <div className="flex flex-col gap-[16px]">
                    <Checkbox
                        labelNode={
                            <>
                                Я ознакомился(ась) с{' '}
                                <Link
                                    to="https://api.teloiduh.ru/uploads/privacy_policy_f0272bf9c3.pdf"
                                    className="text-accent underline underline-offset-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Политикой обработки персональных данных
                                </Link>{' '}
                                и даю {' '}
                                <Link
                                    to="https://api.teloiduh.ru/uploads/1_Soglasie_posetitelya_sajta_na_obrabotku_P_Dn_Cookies_OOO_Telo_i_Duh_4d07c57474_d2266bb9c9.pdf"
                                    className="text-accent underline! underline-offset-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    согласие на обработку персональных данных
                                </Link>
                            </>
                        }
                        checked={watch('consent')}
                        {...register('consent', { required: 'Необходимо согласие на обработку данных' })}
                    />
                    {errors.consent && (
                        <p className="font-cap text-red-500">{errors.consent.message}</p>
                    )}
                </div>

                <Button
                    theme="default"
                    text={isSubmitting || isSending ? "Отправка..." : "оставить заявку"}
                    icon={PaperPlane}
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting || isSending}
                />
            </form>

            <SuccessModal isOpen={successModal.show} onClose={handleSuccessClose} />
            <FailureModal isOpen={failureModal.show} onClose={failureModal.close} />
        </>
    );
};