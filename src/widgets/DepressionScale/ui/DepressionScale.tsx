import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/shared/ui/Button';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { FAQAccordion, type FAQItem } from '@/shared/ui/FAQAccordion';
import { Section } from '@/shared/ui/Section';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Option {
    score: number;
    text: string;
}

interface BdiQuestion {
    id: number;
    title: string;
    options: Option[];
}

// ─── Questions ────────────────────────────────────────────────────────────────

const BDI_QUESTIONS: BdiQuestion[] = [
    {
        id: 1,
        title: 'Печаль',
        options: [
            { score: 0, text: 'Мне не грустно.' },
            { score: 1, text: 'Я чувствую печаль большую часть времени.' },
            { score: 2, text: 'Я все время печален, и не могу от этого избавиться.' },
            { score: 3, text: 'Я так печален и несчастлив, что не могу этого вынести.' },
        ],
    },
    {
        id: 2,
        title: 'Пессимизм',
        options: [
            { score: 0, text: 'Меня не беспокоит мое будущее.' },
            { score: 1, text: 'Я смотрю в будущее с большим пессимизмом и тревогой, чем обычно.' },
            { score: 2, text: 'Я чувствую, что мне нечего ждать от будущего.' },
            { score: 3, text: 'Я чувствую, что мое будущее безнадежно и все станет только хуже.' },
        ],
    },
    {
        id: 3,
        title: 'Прошлые неудачи',
        options: [
            { score: 0, text: 'Я не чувствую себя неудачником.' },
            { score: 1, text: 'Я терпел неудачи чаще, чем среднестатистический человек.' },
            { score: 2, text: 'Когда я оглядываюсь на прошлую жизнь, я вижу лишь череду неудач.' },
            { score: 3, text: 'Я чувствую себя абсолютно несостоявшимся, полным неудачником.' },
        ],
    },
    {
        id: 4,
        title: 'Потеря удовольствия',
        options: [
            { score: 0, text: 'Я получаю столько же удовольствия от вещей, сколько и раньше.' },
            { score: 1, text: 'Я не получаю столько же удовольствия от жизни, сколько раньше.' },
            { score: 2, text: 'Я получаю очень мало удовольствия от вещей, которые раньше радовали.' },
            { score: 3, text: 'Я вообще не могу получать никакого удовлетворения от привычных вещей.' },
        ],
    },
    {
        id: 5,
        title: 'Чувство вины',
        options: [
            { score: 0, text: 'Я не чувствую себя в чем-то виноватым.' },
            { score: 1, text: 'Я испытываю вину за ряд вещей, которые совершил или должен был совершить.' },
            { score: 2, text: 'Почти все время меня преследует сильное фоновое чувство вины.' },
            { score: 3, text: 'Я постоянно чувствую глубинную вину за все происходящее вокруг.' },
        ],
    },
    {
        id: 6,
        title: 'Чувство наказания',
        options: [
            { score: 0, text: 'Я не чувствую, что меня за что-то наказывают.' },
            { score: 1, text: 'Я чувствую глубоко внутри, что могу быть наказан за проступки.' },
            { score: 2, text: 'Я ожидаю, что судьба наложит на меня суровое наказание.' },
            { score: 3, text: 'Я абсолютно уверен, что меня уже сейчас наказывают.' },
        ],
    },
    {
        id: 7,
        title: 'Ненависть к себе',
        options: [
            { score: 0, text: 'Мое самоощущение и отношение к себе не изменилось.' },
            { score: 1, text: 'Я потерял прежнюю уверенность в своих силах.' },
            { score: 2, text: 'Я глубоко разочарован в собственной личности.' },
            { score: 3, text: 'Я испытываю отвращение и непринятие по отношению к себе.' },
        ],
    },
    {
        id: 8,
        title: 'Самокритика',
        options: [
            { score: 0, text: 'Я критикую себя не больше, чем обычно.' },
            { score: 1, text: 'Я критикую себя за личные недостатки намного больше, чем раньше.' },
            { score: 2, text: 'Я склонен упрекать себя за каждую совершенную оплошность.' },
            { score: 3, text: 'Я обвиняю себя во всех негативных событиях мира без исключения.' },
        ],
    },
    {
        id: 9,
        title: 'Суицидальные мысли',
        options: [
            { score: 0, text: 'У меня нет мыслей о нанесении себе вреда или самоубийстве.' },
            { score: 1, text: 'У меня бывают мысли о суициде, но я не стал бы воплощать их.' },
            { score: 2, text: 'Мне хотелось бы покончить с собой, чтобы прекратить это.' },
            { score: 3, text: 'Я бы покончил с собой, если бы представился удобный случай.' },
        ],
    },
    {
        id: 10,
        title: 'Плаксивость',
        options: [
            { score: 0, text: 'Я плачу примерно столько же, сколько обычно.' },
            { score: 1, text: 'Я плачу значительно чаще, чем когда-либо раньше.' },
            { score: 2, text: 'Я плачу из-за каждой мелкой неудачи или стрессовой мысли.' },
            { score: 3, text: 'Мне хочется плакать постоянно, но слез просто не осталось.' },
        ],
    },
    {
        id: 11,
        title: 'Беспокойство',
        options: [
            { score: 0, text: 'Я не испытываю повышенной тревожности или беспокойства.' },
            { score: 1, text: 'Я чувствую большее нервное беспокойство или напряжение, чем обычно.' },
            { score: 2, text: 'Я настолько беспокоен, что мне сложно усидеть на стуле.' },
            { score: 3, text: 'Я нахожусь в непрерывном метании, испытывая сильную ажитацию.' },
        ],
    },
    {
        id: 12,
        title: 'Потеря интереса',
        options: [
            { score: 0, text: 'Я не потерял искренний интерес к обществу или близким.' },
            { score: 1, text: 'Общение с друзьями и близкими дается мне с большим трудом.' },
            { score: 2, text: 'Я потерял большую часть своего интереса к людям или совместным делам.' },
            { score: 3, text: 'Мне абсолютно безразличны любые внешние контакты.' },
        ],
    },
    {
        id: 13,
        title: 'Нерешительность',
        options: [
            { score: 0, text: 'Я принимаю решения так же легко, как делал это всегда.' },
            { score: 1, text: 'Мне требуется гораздо больше времени на обдумывание решений.' },
            { score: 2, text: 'Мне крайне тяжело принять даже базовое повседневное решение.' },
            { score: 3, text: 'Мне физически невозможно сделать простейший бытовой выбор.' },
        ],
    },
    {
        id: 14,
        title: 'Обесценивание себя',
        options: [
            { score: 0, text: 'Я не считаю себя никчемным или бесполезным.' },
            { score: 1, text: 'Я сомневаюсь в своей ценности для близких и общества.' },
            { score: 2, text: 'Я чувствую себя гораздо менее полезным и ценным, чем другие.' },
            { score: 3, text: 'Я чувствую себя абсолютно никчемным, бесполезным балластом.' },
        ],
    },
    {
        id: 15,
        title: 'Утрата энергии',
        options: [
            { score: 0, text: 'У меня достаточно ресурсов и внутренней энергии.' },
            { score: 1, text: 'У меня ощутимо меньше энергии, чем бывало обычно.' },
            { score: 2, text: 'Мне с трудом хватает сил на элементарные рутинные дела.' },
            { score: 3, text: 'Я просыпаюсь полностью истощенным, сил нет совсем.' },
        ],
    },
    {
        id: 16,
        title: 'Изменения сна',
        options: [
            { score: 0, text: 'Мой режим сна и качество отдыха остаются стабильными.' },
            { score: 1, text: 'Я сплю несколько дольше или просыпаюсь раньше обычного.' },
            { score: 2, text: 'Я сплю большую часть дня или мучаюсь от бессонницы часами.' },
            { score: 3, text: 'Качество сна полностью разрушено, бодрствую круглосуточно.' },
        ],
    },
    {
        id: 17,
        title: 'Раздражительность',
        options: [
            { score: 0, text: 'Я не чувствую себя вспыльчивым больше, чем обычно.' },
            { score: 1, text: 'Я замечаю повышенную раздражительность по мелким поводам.' },
            { score: 2, text: 'Меня легко вывести из эмоционального равновесия.' },
            { score: 3, text: 'Я нахожусь в перманентном состоянии гнева и нетерпимости.' },
        ],
    },
    {
        id: 18,
        title: 'Изменения аппетита',
        options: [
            { score: 0, text: 'Мои пищевые привычки и аппетит не претерпели изменений.' },
            { score: 1, text: 'Мой аппетит стал заметно сниженным или, наоборот, повышен.' },
            { score: 2, text: 'Аппетит изменился радикально: ем либо слишком много, либо почти ничего.' },
            { score: 3, text: 'Потерял интерес к пище совсем либо испытываю патологический голод.' },
        ],
    },
    {
        id: 19,
        title: 'Трудности концентрации',
        options: [
            { score: 0, text: 'Я могу фокусировать внимание и анализировать информацию без проблем.' },
            { score: 1, text: 'Для глубокой концентрации мне теперь требуется намного больше сил.' },
            { score: 2, text: 'Мне трудно до конца дослушать собеседника или дочитать статью.' },
            { score: 3, text: 'Способность к умственной фиксации внимания полностью заблокирована.' },
        ],
    },
    {
        id: 20,
        title: 'Усталость',
        options: [
            { score: 0, text: 'Я устаю не сильнее, чем обычно в течение рабочего дня.' },
            { score: 1, text: 'Привычные обязанности вызывают во мне более быстрое физическое утомление.' },
            { score: 2, text: 'Я слишком утомлен, чтобы делать привычные дела по дому или работе.' },
            { score: 3, text: 'Я чувствую перманентную изнуряющую усталость при любых условиях.' },
        ],
    },
    {
        id: 21,
        title: 'Потеря либидо',
        options: [
            { score: 0, text: 'Мой сексуальный темперамент и влечение стабильны.' },
            { score: 1, text: 'Мой интерес к сексу заметно снизился в последнее время.' },
            { score: 2, text: 'Интерес к интимной жизни практически угас.' },
            { score: 3, text: 'Я потерял всякий интерес к сексу и физической близости.' },
        ],
    },
];

// ─── Interpretation ───────────────────────────────────────────────────────────

function getInterpretation(score: number) {
    if (score <= 13) {
        return {
            level: 'Минимальный уровень депрессии',
            desc: 'Ваш результат не указывает на выраженную депрессию. В рамках нормы возможны небольшие перепады настроения.',
        };
    } else if (score <= 19) {
        return {
            level: 'Легкий уровень депрессии',
            desc: 'Выявлены начальные проявления депрессивного эпизода. Рекомендуется проконсультироваться со специалистом.',
        };
    } else if (score <= 28) {
        return {
            level: 'Умеренный уровень депрессии',
            desc: 'Серьезная нагрузка на нервную систему. Требуется очное клиническое интервью у врача-психиатра или психотерапевта.',
        };
    } else {
        return {
            level: 'Выраженная (тяжелая) депрессия',
            desc: 'Критическое состояние. Выраженная депрессивная симптоматика требует немедленного клинического разбора. Пожалуйста, обратитесь за квалифицированной помощью.',
        };
    }
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
    const percent = Math.round((current / total) * 100);
    return (
        <div className="flex items-center gap-[20px]">
            <div className="flex-1 h-[2px] bg-design-elements/40 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={false}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
            </div>
            <span className="font-lbl text-text-secondary shrink-0">
                {current} / {total}
            </span>
        </div>
    );
}

// ─── Instruction Sidebar ──────────────────────────────────────────────────────

function InstructionBox() {
    return (
        <div className="bg-white border border-background-secondary rounded-[5px] p-[40px] max-md:p-[20px] flex flex-col items-center justify-center gap-[20px]">
            <h4 className="font-h4 text-accent uppercase text-center">Инструкция</h4>
            <p className="font-p-md text-text-primary">
                Этот опросник состоит из 21 группы утверждений. Пожалуйста, выберите одно утверждение в каждой группе, которое лучше всего описывает ваше состояние за последние две недели (включая сегодняшний день).
            </p>
        </div>
    );
}

// ─── Question Header ──────────────────────────────────────────────────────────

interface QuestionHeaderProps {
    question: BdiQuestion;
    direction: 1 | -1;
}

function QuestionHeader({ question, direction }: QuestionHeaderProps) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
            <span className="font-lbl text-accent block mb-[12px]">
                {String(question.id).padStart(2, '0')}
            </span>
            <h3 className="font-h3 font-heading uppercase text-heading">
                {question.title}
            </h3>
        </motion.div>
    );
}

// ─── Question Options ─────────────────────────────────────────────────────────

interface QuestionOptionsProps {
    question: BdiQuestion;
    selectedScore: number | undefined;
    onSelect: (score: number) => void;
    direction: 1 | -1;
}

function QuestionOptions({ question, selectedScore, onSelect, direction }: QuestionOptionsProps) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex flex-col gap-[16px]"
        >
            {question.options.map((opt) => {
                const isSelected = selectedScore === opt.score;
                return (
                    <button
                        key={opt.score}
                        onClick={() => onSelect(opt.score)}
                        className={[
                            'flex items-center gap-[16px] text-left w-full px-[24px] py-[20px] border transition-colors duration-200 cursor-pointer group',
                            isSelected
                                ? 'border-accent bg-background-secondary'
                                : 'border-design-elements/40 bg-transparent hover:border-accent/60',
                        ].join(' ')}
                    >
                        <span className={[
                            'shrink-0 w-[16px] h-[16px] rounded-full border flex items-center justify-center transition-colors duration-150',
                            isSelected ? 'border-accent' : 'border-design-elements group-hover:border-accent',
                        ].join(' ')}>
                            <span className={[
                                'w-[10px] h-[10px] rounded-full transition-colors duration-150',
                                isSelected ? 'bg-accent' : 'bg-transparent',
                            ].join(' ')} />
                        </span>
                        <span className={[
                            'font-p-sm transition-colors duration-150',
                            isSelected ? 'text-heading' : 'text-text-secondary group-hover:text-heading',
                        ].join(' ')}>
                            {opt.text}
                        </span>
                    </button>
                );
            })}
        </motion.div>
    );
}

// ─── Result View ──────────────────────────────────────────────────────────────

interface ResultViewProps {
    totalScore: number;
    selections: Record<number, number>;
    onReset: () => void;
    onPrint: () => void;
}

function ResultView({ totalScore, selections, onReset, onPrint }: ResultViewProps) {
    const { level, desc } = getInterpretation(totalScore);

    const answerItems: FAQItem[] = [
        {
            id: 'answers',
            question: 'Показать выбранные ответы',
            answer: BDI_QUESTIONS.map(
                (q) => `${q.id}. ${q.title}: ${q.options.find((o) => o.score === selections[q.id])?.text ?? '—'}`
            ).join('\n'),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {/* Score headline */}
            <div className="mb-[40px]">
                <h2 className="font-h2 font-heading uppercase text-accent mb-[12px]">
                    Ваш результат
                </h2>
                <p className="font-p-md text-heading">
                    {totalScore} {totalScore === 1 ? 'балл' : totalScore <= 4 ? 'балла' : 'баллов'} — {level.toLowerCase()}
                </p>
                <p className="font-p-md text-text-secondary mt-[8px]">{desc}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-design-elements/40 mb-[40px]" />

            {/* Answers accordion */}
            <div className="mb-[40px]">
                <FAQAccordion items={answerItems} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-[16px]">
                <Button
                    text="Пройти повторно"
                    theme="light"
                    onClick={onReset}
                    className="flex-1"
                />
                <Button
                    text="Сохранить результат в PDF"
                    theme="default"
                    onClick={onPrint}
                    className="flex-1"
                />
            </div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function DepressionScale() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selections, setSelections] = useState<Record<number, number>>({});
    const [testComplete, setTestComplete] = useState(false);
    const [direction, setDirection] = useState<1 | -1>(1);

    const currentQuestion = BDI_QUESTIONS[currentIdx];
    const totalQuestions = BDI_QUESTIONS.length;
    const answeredCount = Object.keys(selections).length;
    const totalScore = (Object.values(selections) as number[]).reduce((acc, cur) => acc + cur, 0);

    const handleSelect = (score: number) => {
        setSelections((prev) => ({ ...prev, [currentQuestion.id]: score }));
    };

    const handleNext = () => {
        if (selections[currentQuestion.id] === undefined) return;
        if (currentIdx < totalQuestions - 1) {
            setDirection(1);
            setCurrentIdx((i) => i + 1);
        } else {
            setTestComplete(true);
        }
    };

    const handlePrev = () => {
        if (currentIdx > 0) {
            setDirection(-1);
            setCurrentIdx((i) => i - 1);
        }
    };

    const handleReset = () => {
        setSelections({});
        setCurrentIdx(0);
        setTestComplete(false);
        setDirection(1);
    };

    const handlePrint = () => {
        window.print();
    };

    const isAnswered = selections[currentQuestion?.id] !== undefined;
    const isLastQuestion = currentIdx === totalQuestions - 1;

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[100px] max-md:gap-[50px]"
            role="region"
            aria-label="depression-scale"
        >
            <AnimatePresence mode="wait">
                {!testComplete ? (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 xl:grid-cols-[1fr_428px] xl:grid-rows-[auto_auto_auto] gap-[30px]"
                    >
                        {/* Row 1: Progress bar — left only */}
                        <div className="xl:col-start-1 xl:col-span-2 xl:row-start-1">
                            <ProgressBar current={answeredCount} total={totalQuestions} />
                        </div>

                        {/* Row 2: Question heading — left only */}
                        <div className="overflow-hidden xl:col-span-2 xl:col-start-1 xl:row-start-2">
                            <AnimatePresence mode="wait" initial={false}>
                                <QuestionHeader
                                    key={currentQuestion.id}
                                    question={currentQuestion}
                                    direction={direction}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Row 3 left: Options */}
                        <div className="overflow-hidden xl:col-start-1 xl:row-start-3">
                            <AnimatePresence mode="wait" initial={false}>
                                <QuestionOptions
                                    key={currentQuestion.id}
                                    question={currentQuestion}
                                    selectedScore={selections[currentQuestion.id]}
                                    onSelect={handleSelect}
                                    direction={direction}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Row 3 right: Instruction — aligns with options */}
                        <div className="xl:col-start-2 xl:row-start-3 row-start-1">
                            <InstructionBox />
                        </div>

                        {/* Row 4: Navigation — left only */}
                        <div className="grid grid-cols-3 gap-[16px] xl:col-start-1 xl:row-start-4">
                            <Button
                                text="Назад"
                                theme="light"
                                size="small"
                                disabled={currentIdx === 0}
                                onClick={handlePrev}
                            />
                            <Button
                                text="Далее"
                                theme="light"
                                size="small"
                                disabled={!isAnswered}
                                onClick={handleNext}
                            />
                            <Button
                                text="Посмотреть результаты"
                                theme="default"
                                size="small"
                                disabled={answeredCount < totalQuestions}
                                onClick={() => setTestComplete(true)}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ResultView
                            totalScore={totalScore}
                            selections={selections}
                            onReset={handleReset}
                            onPrint={handlePrint}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
}