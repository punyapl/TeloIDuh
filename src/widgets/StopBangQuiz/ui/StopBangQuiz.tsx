import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { Button } from '@/shared/ui/Button';
import { Section } from '@/shared/ui/Section';

interface Question {
    id: string;
    label: string;
    text: string;
}

const QUESTIONS: Question[] = [
    {
        id: 'snore',
        label: 'S — Snore',
        text: 'Замечаете ли вы или ваши близкие, что вы громко храпите? Приходится ли им вас будить во время сна, чтобы вы меньше храпели?',
    },
    {
        id: 'observed',
        label: 'O — Observed',
        text: 'Вы или ваши близкие когда-нибудь замечали, что во время сна вы перестаете дышать на какое то время?',
    },
    {
        id: 'tired',
        label: 'T — Tired',
        text: 'Чувствуете ли вы усталость в течение дня, которая проходит ближе к вечеру?',
    },

    {
        id: 'pressure',
        label: 'P — Pressure',
        text: 'Есть ли у вас артериальная гипертония? (АД > 140/90 мм.рт.ст.)',
    },
    {
        id: 'neck',
        label: 'N — Neck',
        text: 'Обхват шеи больше 40 см (муж) или 35,5 см (жен)?',
    },
    {
        id: 'bmi',
        label: 'B — BMI',
        text: 'Ваш Индекс массы тела выше 35 кг/м2?',
    },
    {
        id: 'age',
        label: 'A — Age',
        text: 'Вам больше 50 лет?',
    },

    {
        id: 'gender',
        label: 'G — Gender',
        text: 'Вы мужчина?',
    },
];

const RADIO_OPTIONS = [
    { value: 'yes', label: 'Да' },
    { value: 'no', label: 'Нет' },
];

type Answers = Record<string, 'yes' | 'no' | ''>;

const initialAnswers = (): Answers =>
    Object.fromEntries(QUESTIONS.map((q) => [q.id, '']));

type RiskLevel = 'low' | 'intermediate' | 'high';

interface RiskResult {
    level: RiskLevel;
    score: number;
    title: string;
    description: string;
}

function calcResult(answers: Answers): RiskResult {
    const score = Object.values(answers).filter((v) => v === 'yes').length;

    const stopYes = (['snore', 'tired', 'observed', 'pressure'] as const).filter(
        (id) => answers[id] === 'yes',
    ).length;

    let level: RiskLevel = 'low';
    if (score >= 5) {
        level = 'high';
    } else if (score >= 3) {
        level = 'intermediate';
        if (
            stopYes >= 2 &&
            (answers.gender === 'yes' || answers.bmi === 'yes' || answers.neck === 'yes')
        ) {
            level = 'high';
        }
    }

    const map: Record<RiskLevel, { title: string; description: string }> = {
        low: {
            title: 'Низкий риск',
            description:
                'Риск синдрома обструктивного апноэ сна низкий. Продолжайте поддерживать здоровый образ жизни и следите за качеством сна.',
        },
        intermediate: {
            title: 'Умеренный риск',
            description:
                'Рекомендуется обратить внимание на гигиену сна и проконсультироваться с врачом для плановой диагностики.',
        },
        high: {
            title: 'Высокий риск',
            description:
                'Высокая вероятность синдрома обструктивного апноэ сна. Как можно скорее обратитесь к врачу для диагностики синдрома обструктивного апноэ сна.',
        },
    };

    return { level, score, ...map[level] };
}

const WarningIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
        <path d="M9 1L17 16H1L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="13" r="0.75" fill="currentColor" />
    </svg>
);

const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 9L7.5 11L12.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const StopBangQuiz = () => {
    const [answers, setAnswers] = useState<Answers>(initialAnswers());
    const [result, setResult] = useState<RiskResult | null>(null);
    const [error, setError] = useState(false);

    const handleChange = (id: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [id]: value as 'yes' | 'no' }));
        if (error) setError(false);
    };

    const handleCalculate = () => {
        const hasUnanswered = Object.values(answers).some((v) => v === '');
        if (hasUnanswered) {
            setError(true);
            return;
        }
        setResult(calcResult(answers));
    };

    const handleReset = () => {
        setAnswers(initialAnswers());
        setResult(null);
        setError(false);
    };

    const leftQuestions = QUESTIONS.filter((_, i) => i % 2 === 0);
    const rightQuestions = QUESTIONS.filter((_, i) => i % 2 === 1);

    const riskColorMap: Record<RiskLevel, string> = {
        low: 'text-accent',
        intermediate: 'text-accent',
        high: 'text-accent',
    };

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[100px] max-md:gap-[50px]"
            role="region"
            aria-label="stop-bang-quiz"
        >
            <div className="flex flex-col gap-[40px]">
                {/* Questions grid */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_auto] gap-[40px]">
                    <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-[40px] gap-y-[30px]">
                        {QUESTIONS.map((q) => (
                            <QuestionRow
                                key={q.id}
                                question={q}
                                value={answers[q.id]}
                                onChange={(v) => handleChange(q.id, v)}
                                hasError={error && answers[q.id] === ''}
                            />
                        ))}
                    </div>

                    {/* Result panel */}
                    <div className="xl:w-[428px] bg-white border border-background-secondary rounded-[5px] p-[40px] max-md:p-[20px] flex flex-col items-center justify-center gap-[20px]">
                        <h4 className="font-h4 text-accent uppercase text-center">Итоговый результат</h4>

                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col gap-[16px]"
                                >
                                    <span className="font-h5 font-heading text-text-primary uppercase text-center">
                                        {result.score} {result.score === 1 ? 'БАЛЛ' : result.score < 5 ? 'БАЛЛА' : 'БАЛЛОВ'}
                                    </span>

                                    <div
                                        className="flex items-start gap-[10px] font-p-md text-text-primary"
                                    >
                                        {result.level === 'low' ? <CheckIcon /> : <WarningIcon />}
                                        <span>{result.title}. {result.description}</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="font-p-md text-text-primary"
                                >
                                    Ответьте на все вопросы и нажмите «Рассчитать»
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="font-p-sm text-accent"
                                >
                                    Пожалуйста, ответьте на все вопросы
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
                    <Button
                        theme="default"
                        text="Рассчитать"
                        onClick={handleCalculate}
                    />
                    <Button
                        theme="light"
                        text="Сбросить"
                        onClick={handleReset}
                    />
                    <Button
                        theme="light"
                        text="Сохранить результат в PDF"
                        onClick={() => window.print()}
                        disabled={!result}
                    />
                </div>
            </div>
        </Section>
    );
};

interface QuestionRowProps {
    question: Question;
    value: string;
    onChange: (value: string) => void;
    hasError: boolean;
}

const QuestionRow = ({ question, value, onChange, hasError }: QuestionRowProps) => (
    <div className={`flex flex-col gap-[10px] justify-between transition-colors duration-200 ${hasError ? 'opacity-70' : ''}`}>
        <div className="flex flex-col gap-[4px]">
            <p className="font-p-md text-heading">
                {question.text}
            </p>
        </div>
        <RadioGroup
            name={question.id}
            options={RADIO_OPTIONS}
            value={value}
            onChange={onChange}
        />
    </div>
);