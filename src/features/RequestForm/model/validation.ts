// model/validations.ts
export const requestValidations = {
    name: {
        required: "Введите ваше имя",
        minLength: {
            value: 2,
            message: "Имя должно содержать минимум 2 символа"
        },
        maxLength: {
            value: 50,
            message: "Имя не должно превышать 50 символов"
        },
        pattern: {
            value: /^[а-яёА-ЯЁa-zA-Z\s\-]+$/,
            message: "Имя может содержать только буквы, пробелы и дефисы"
        },
        validate: {
            noOnlySpaces: (value: string) =>
                value.trim().length >= 2 || "Имя не может состоять только из пробелов"
        }
    },

    phone: {
        required: "Введите ваш номер телефона",
        validate: {
            validFormat: (value: string) => {
                if (!value) return "Введите номер телефона";
                // Очищаем от маски для проверки длины
                const digits = value.replace(/\D/g, '');

                if (digits.length < 11) return "Номер слишком короткий";
                if (digits.length > 11) return "Номер слишком длинный";

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
            noExcessiveSymbols: (value: string | undefined) => {
                if (!value) return true; // Поле не обязательное
                const specialCharsCount = (value.match(/[^а-яёА-ЯЁa-zA-Z0-9\s,.!?;:\-()]/g) || []).length;
                return specialCharsCount < value.length * 0.3 || "Слишком много специальных символов";
            }
        }
    }
} as const;