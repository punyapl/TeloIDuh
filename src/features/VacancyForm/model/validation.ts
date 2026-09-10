// features/VacancyForm/model/validations.ts
export const vacancyValidations = {
    name: {
        required: "Введите ваше ФИО",
        minLength: {
            value: 2,
            message: "ФИО должно содержать минимум 2 символа"
        },
        maxLength: {
            value: 100, // Увеличили лимит для полного ФИО
            message: "ФИО не должно превышать 100 символов"
        },
        pattern: {
            value: /^[а-яёА-ЯЁa-zA-Z\s\-]+$/,
            message: "ФИО может содержать только буквы, пробелы и дефисы"
        },
        validate: {
            noOnlySpaces: (value: string) =>
                value.trim().length >= 2 || "ФИО не может состоять только из пробелов"
        }
    },

    phone: {
        required: "Введите ваш номер телефона",
        validate: {
            validFormat: (value: string) => {
                if (!value) return "Введите номер телефона";
                const digits = value.replace(/\D/g, '');

                if (digits.length < 11) return "Номер слишком короткий (минимум 11 цифр)";
                if (digits.length > 11) return "Номер слишком длинный (максимум 11 цифр)";

                const firstDigit = digits[0];
                if (firstDigit !== '7' && firstDigit !== '8') {
                    return "Номер должен начинаться с +7 или 8";
                }

                const operatorCode = digits.substring(1, 4);
                if (operatorCode === '000') {
                    return "Некорректный код оператора";
                }

                return true;
            }
        }
    },

    message: {
        maxLength: {
            value: 500,
            message: "Комментарий не должен превышать 500 символов"
        },
        validate: {
            // Так как поле необязательное, делаем проверку на длину только ЕСЛИ текст введен
            minLengthIfNotEmpty: (value: string | undefined) => {
                if (!value || value.trim().length === 0) return true;
                return value.trim().length >= 10 || "Комментарий должен содержать минимум 10 символов";
            },
            noExcessiveSymbols: (value: string | undefined) => {
                if (!value) return true;
                const specialCharsCount = (value.match(/[^а-яёА-ЯЁa-zA-Z0-9\s,.!?;:\-()]/g) || []).length;
                return specialCharsCount < value.length * 0.3 || "Слишком много специальных символов";
            }
        }
    }
} as const;