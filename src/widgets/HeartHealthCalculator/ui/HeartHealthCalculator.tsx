import { useState } from 'react';
import { Dropdown } from '@/shared/ui/Dropdown';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Button } from '@/shared/ui/Button';
import { Scale } from '@/shared/ui/Scale';
import { Section } from '@/shared/ui/Section';
import { FAQAccordion } from '@/shared/ui/FAQAccordion';

// ─── Score data ───────────────────────────────────────────────────────────────

const NUTRITION_OPTIONS = [
    { value: '100', label: 'Средиземноморская / DASH' },
    { value: '75', label: 'Высокое качество, сбалансированное' },
    { value: '50', label: 'Умеренное количество сахара и жиров' },
    { value: '25', label: 'Частый фастфуд / Несистематическое' },
];

const SLEEP_OPTIONS = [
    { value: '100', label: '7-9 часов' },
    { value: '75', label: '6-7 часов' },
    { value: '40', label: '9-10 часов (Длинный сон)' },
    { value: '20', label: 'Менее 6 часов' },
];

const ACTIVITY_OPTIONS = [
    { value: '100', label: '≥150' },
    { value: '75', label: '75–149' },
    { value: '40', label: '1–74 (нерегулярно)' },
    { value: '0', label: '0 (сидячий образ жизни)' },
];

const SMOKE_OPTIONS = [
    { value: '100', label: 'Никогда не курил(а)' },
    { value: '80', label: 'Бросил > 5 лет назад' },
    { value: '50', label: 'Бросил 1-5 лет назад' },
    { value: '30', label: 'Бросил менее 1 года назад' },
    { value: '10', label: 'Активный курильщик' },
];

const BMI_OPTIONS = [
    { value: '100', label: '<25' },
    { value: '70', label: '25.0 – 29.9 (Избыток веса)' },
    { value: '30', label: '≥30.0 (Ожирение)' },
    { value: '50', label: '<18.5 (Дефицит веса)' },
];

const CHOLESTEROL_OPTIONS = [
    { value: '100', label: '<3.36' },
    { value: '70', label: '3.36 – 4.11' },
    { value: '40', label: '4.12 – 4.89' },
    { value: '10', label: '≥4.90 (Критический)' },
];

const GLUCOSE_OPTIONS = [
    { value: '100', label: 'Норма' },
    { value: '60', label: 'Преддиабет (5.7–6.4%)' },
    { value: '20', label: 'Сахарный диабет (≥6.5%)' },
];

const BP_OPTIONS = [
    { value: '100', label: '<120/<80' },
    { value: '80', label: '120–129/<80 (Повышенное)' },
    { value: '50', label: '130–139/80–89 (Гипертония 1 ст.)' },
    { value: '20', label: '≥140/≥90 (Кризис / 2 ст.)' },
];

// ─── Recommendations ──────────────────────────────────────────────────────────

const RECOMMENDATIONS: Record<string, { good: string; moderate: string; bad: string }> = {
    nutrition: {
        good: 'Ваш рацион соответствует лучшим мировым стандартам кардиопрофилактики. Продолжайте придерживаться средиземноморских принципов питания: больше овощей, рыбы, оливкового масла и цельных злаков.',
        moderate: 'Есть возможности для улучшения рациона. Постарайтесь увеличить потребление овощей, фруктов, рыбы и снизить количество обработанных продуктов и добавленного сахара.',
        bad: 'Рацион существенно повышает сердечно-сосудистый риск. Рекомендуется консультация диетолога и переход к противовоспалительному типу питания. Исключите фастфуд, трансжиры и избыточный сахар.',
    },
    sleep: {
        good: 'Оптимальная продолжительность сна поддерживает здоровье сердца, нормализует артериальное давление и регулирует гормональный фон. Продолжайте соблюдать режим сна.',
        moderate: 'Недостаточный или избыточный сон связан с повышением риска гипертонии и метаболических нарушений. Старайтесь придерживаться 7-9 часов качественного непрерывного сна.',
        bad: 'Хроническое нарушение сна — серьёзный фактор риска для сердечно-сосудистой системы. Обратитесь к сомнологу для оценки качества сна и исключения апноэ.',
    },
    activity: {
        good: 'Регулярные аэробные нагрузки снижают риск ССЗ на 30–40%. Вы находитесь в целевой зоне ВОЗ. Продолжайте комбинировать кардио и силовые тренировки.',
        moderate: 'Физическая активность ниже рекомендованного уровня. Постепенно увеличивайте время тренировок до 150 мин умеренной нагрузки в неделю. Даже 30-минутная прогулка ежедневно даёт значимый эффект.',
        bad: 'Сидячий образ жизни — один из ведущих факторов сердечно-сосудистого риска. Начните с коротких прогулок и постепенно увеличивайте нагрузку. Любая активность лучше, чем её отсутствие.',
    },
    smoke: {
        good: 'Отсутствие воздействия табачного дыма — один из ключевых факторов здоровья сосудов. Ваш эндотелий защищён.',
        moderate: 'Отказ от курения — правильный шаг. Риск ССЗ продолжает снижаться с каждым годом воздержания. Через 5 лет он приближается к уровню никогда не куривших.',
        bad: 'Курение повреждает эндотелий сосудов, способствует атеросклерозу и многократно повышает риск инфаркта и инсульта. Обратитесь за поддержкой в отказе от курения — это самое важное, что вы можете сделать для сердца.',
    },
    bmi: {
        good: 'Нормальный ИМТ снижает нагрузку на сердце и снижает риск диабета 2 типа, гипертонии и атеросклероза. Поддерживайте текущий вес.',
        moderate: 'Избыток массы тела повышает нагрузку на сердечно-сосудистую систему. Даже снижение веса на 5–10% значительно улучшает кардиометаболические показатели.',
        bad: 'Ожирение существенно повышает риск гипертонии, диабета, дислипидемии и ССЗ. Рекомендуется комплексная программа снижения веса с участием диетолога и эндокринолога.',
    },
    cholesterol: {
        good: 'Уровень не-ЛПВП холестерина находится в оптимальном диапазоне. Продолжайте придерживаться кардиопротективного рациона и регулярно проверяйте липидный профиль.',
        moderate: 'Уровень холестерина умеренно повышен. Рекомендуется диетическая коррекция, увеличение физической активности и повторный анализ через 3 месяца.',
        bad: 'Высокий уровень не-ЛПВП холестерина — значимый фактор атеросклероза. Необходима консультация кардиолога и, возможно, медикаментозная терапия статинами.',
    },
    glucose: {
        good: 'Нормальный уровень глюкозы и HbA1c свидетельствует о здоровом углеводном обмене и снижает риск сосудистых осложнений диабета.',
        moderate: 'Преддиабетическое состояние требует внимания. Изменения образа жизни (рацион, физическая активность, снижение веса) могут полностью предотвратить развитие диабета 2 типа.',
        bad: 'Сахарный диабет многократно повышает риск ССЗ. Строгий гликемический контроль, регулярный мониторинг и лечение под наблюдением эндокринолога критически важны для защиты сосудов.',
    },
    bp: {
        good: 'Артериальное давление в оптимальном диапазоне. Это снижает нагрузку на стенки сосудов и уменьшает риск инсульта и инфаркта. Продолжайте контролировать давление регулярно.',
        moderate: 'Повышенное артериальное давление нуждается в коррекции. Снижение потребления соли, увеличение физической активности и управление стрессом помогут нормализовать показатели.',
        bad: 'Гипертония — ведущий фактор риска инсульта и инфаркта. Необходима консультация кардиолога, подбор медикаментозной терапии и постоянный самоконтроль давления.',
    },
};

function getRecommendation(key: string, score: number): string {
    const rec = RECOMMENDATIONS[key];
    if (!rec) return '';
    if (score >= 75) return rec.good;
    if (score >= 40) return rec.moderate;
    return rec.bad;
}

// ─── Component ────────────────────────────────────────────────────────────────

// Snapshot of all inputs at the moment of calculation
type CalculatedValues = {
    nutrition: string;
    sleep: string;
    activity: string;
    smoke: string;
    livingWithSmoker: boolean;
    bmi: string;
    cholesterol: string;
    cholesterolTherapy: boolean;
    glucose: string;
    bp: string;
    bpTherapy: boolean;
};

export function HeartHealthCalculator() {
    const [hasCalculated, setHasCalculated] = useState(false);
    const [calculatedValues, setCalculatedValues] = useState<CalculatedValues | null>(null);

    const [nutrition, setNutrition] = useState('');
    const [sleep, setSleep] = useState('');
    const [activity, setActivity] = useState('');
    const [smoke, setSmoke] = useState('');
    const [livingWithSmoker, setLivingWithSmoker] = useState(false);
    const [bmi, setBmi] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [cholesterolTherapy, setCholesterolTherapy] = useState(false);
    const [glucose, setGlucose] = useState('');
    const [bp, setBp] = useState('');
    const [bpTherapy, setBpTherapy] = useState(false);

    // All required dropdowns must be filled before calculation is allowed
    const isFormValid =
        nutrition !== '' &&
        sleep !== '' &&
        activity !== '' &&
        smoke !== '' &&
        bmi !== '' &&
        cholesterol !== '' &&
        glucose !== '' &&
        bp !== '';

    const handleCalculate = () => {
        if (!isFormValid) return;

        setCalculatedValues({
            nutrition,
            sleep,
            activity,
            smoke,
            livingWithSmoker,
            bmi,
            cholesterol,
            cholesterolTherapy,
            glucose,
            bp,
            bpTherapy,
        });
        setHasCalculated(true);
    };

    // Computed scores — based only on the last calculated snapshot,
    // so the result doesn't change until "Рассчитать" is pressed again
    const scoreNutrition = calculatedValues ? parseInt(calculatedValues.nutrition) : 0;
    const scoreSleep = calculatedValues ? parseInt(calculatedValues.sleep) : 0;
    const scoreActivity = calculatedValues ? parseInt(calculatedValues.activity) : 0;
    const scoreSmoke = calculatedValues
        ? Math.max(0, parseInt(calculatedValues.smoke) - (calculatedValues.livingWithSmoker ? 20 : 0))
        : 0;
    const scoreBmi = calculatedValues ? parseInt(calculatedValues.bmi) : 0;
    const scoreCholesterol = calculatedValues
        ? Math.max(0, parseInt(calculatedValues.cholesterol) - (calculatedValues.cholesterolTherapy ? 20 : 0))
        : 0;
    const scoreGlucose = calculatedValues ? parseInt(calculatedValues.glucose) : 0;
    const scoreBp = calculatedValues
        ? Math.max(0, parseInt(calculatedValues.bp) - (calculatedValues.bpTherapy ? 20 : 0))
        : 0;

    const finalScore = Math.round(
        (scoreNutrition + scoreSleep + scoreActivity + scoreSmoke + scoreBmi + scoreCholesterol + scoreGlucose + scoreBp) / 8
    );

    const getInterpretation = () => {
        if (finalScore >= 80) return {
            level: 'Оптимальный',
            desc: 'Поздравляем! Ваши показатели сердечно-сосудистой системы находятся в превосходном диапазоне. Это свидетельствует о высоком резерве долголетия и минимальном риске инфаркта или инсульта в ближайшие 10 лет. Продолжайте придерживаться данного образа жизни и проходите плановый чек-ап раз в год.',
        };
        if (finalScore >= 50) return {
            level: 'Умеренный риск',
            desc: 'Обратите внимание. У вас выявлены умеренные отклонения в некоторых факторах. Рекомендуется оптимизировать рацион, увеличить физическую активность и проконсультироваться с кардиологом для профилактики дегенеративных процессов.',
        };
        return {
            level: 'Высокий риск',
            desc: 'Внимание! Обнаружены значительные отклонения по многим биомаркерам. Оценка указывает на высокий риск возникновения гипертонической болезни, ишемии или нарушений углеводного обмена. Настоятельно рекомендуем записаться на полный чек-ап сердца.',
        };
    };

    const interpretation = getInterpretation();

    const handleReset = () => {
        setNutrition('');
        setSleep('');
        setActivity('');
        setSmoke('');
        setLivingWithSmoker(false);
        setBmi('');
        setCholesterol('');
        setCholesterolTherapy(false);
        setGlucose('');
        setBp('');
        setBpTherapy(false);
        setHasCalculated(false);
        setCalculatedValues(null);
    };

    // Accordion items for recommendations
    const accordionItems = [
        {
            id: 'rec-nutrition',
            index: '01',
            question: 'Питание',
            answer: getRecommendation('nutrition', scoreNutrition),
        },
        {
            id: 'rec-sleep',
            index: '02',
            question: 'Сон',
            answer: getRecommendation('sleep', scoreSleep),
        },
        {
            id: 'rec-activity',
            index: '03',
            question: 'Физическая активность',
            answer: getRecommendation('activity', scoreActivity),
        },
        {
            id: 'rec-bmi',
            index: '04',
            question: 'Индекс массы тела',
            answer: getRecommendation('bmi', scoreBmi),
        },
        {
            id: 'rec-smoke',
            index: '05',
            question: 'Курение',
            answer: getRecommendation('smoke', scoreSmoke),
        },
        {
            id: 'rec-cholesterol',
            index: '06',
            question: 'Холестерин',
            answer: getRecommendation('cholesterol', scoreCholesterol),
        },
        {
            id: 'rec-glucose',
            index: '07',
            question: 'Глюкоза',
            answer: getRecommendation('glucose', scoreGlucose),
        },
        {
            id: 'rec-bp',
            index: '08',
            question: 'Артериальное давление',
            answer: getRecommendation('bp', scoreBp),
        },
    ];

    const gauges = [
        { label: 'Питание', score: scoreNutrition },
        { label: 'Сон', score: scoreSleep },
        { label: 'Активность', score: scoreActivity },
        { label: 'Курение', score: scoreSmoke },
        { label: 'ИМТ', score: scoreBmi },
        { label: 'Холестерин', score: scoreCholesterol },
        { label: 'Глюкоза', score: scoreGlucose },
        { label: 'Артериальное давление', score: scoreBp },
    ];

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[100px] max-md:gap-[50px]"
            role="region"
            aria-label="heart-health-calculator"
        >
            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-[30px] items-start">

                {/* Left: form */}
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* 1. Питание */}
                        <Dropdown
                            label="Питание"
                            options={NUTRITION_OPTIONS}
                            value={nutrition}
                            onChange={setNutrition}
                            placeholder="Выберите вариант"
                        />

                        {/* 2. Сон */}
                        <Dropdown
                            label="Сон"
                            options={SLEEP_OPTIONS}
                            value={sleep}
                            onChange={setSleep}
                            placeholder="Выберите вариант"
                        />

                        {/* 3. Физическая активность (мин/нед) */}
                        <Dropdown
                            label="Физическая активность (мин/нед)"
                            options={ACTIVITY_OPTIONS}
                            value={activity}
                            onChange={setActivity}
                            placeholder="Выберите вариант"
                        />

                        {/* 4. Индекс массы тела */}
                        <Dropdown
                            label="Индекс массы тела"
                            options={BMI_OPTIONS}
                            value={bmi}
                            onChange={setBmi}
                            placeholder="Выберите вариант"
                        />

                        {/* 5. Курение */}
                        <div className="flex flex-col gap-[10px]">
                            <Dropdown
                                label="Курение"
                                options={SMOKE_OPTIONS}
                                value={smoke}
                                onChange={setSmoke}
                                placeholder="Выберите вариант"
                            />
                            <Checkbox
                                label="Живу с курильщиком (-20)"
                                checked={livingWithSmoker}
                                onChange={(e) => setLivingWithSmoker(e.target.checked)}
                            />
                        </div>

                        {/* 6. Холестерин (Не-ЛПВП, ммоль/л) */}
                        <div className="flex flex-col gap-[10px]">
                            <Dropdown
                                label="Холестерин (Не-ЛПВП, ммоль/л)"
                                options={CHOLESTEROL_OPTIONS}
                                value={cholesterol}
                                onChange={setCholesterol}
                                placeholder="Выберите вариант"
                            />
                            <Checkbox
                                label="На терапии (-20)"
                                checked={cholesterolTherapy}
                                onChange={(e) => setCholesterolTherapy(e.target.checked)}
                            />
                        </div>

                        {/* 7. Глюкоза (HbA1c / гликированный гемоглобин) */}
                        <Dropdown
                            label="Глюкоза (HbA1c / глик. гемоглобин)"
                            options={GLUCOSE_OPTIONS}
                            value={glucose}
                            onChange={setGlucose}
                            placeholder="Выберите вариант"
                        />

                        {/* 8. Артериальное давление (мм.рт.ст.) */}
                        <div className="flex flex-col gap-[10px]">
                            <Dropdown
                                label="Артериальное давление (мм.рт.ст.)"
                                options={BP_OPTIONS}
                                value={bp}
                                onChange={setBp}
                                placeholder="Выберите вариант"
                            />
                            <Checkbox
                                label="На антигипертензивной терапии (-20)"
                                checked={bpTherapy}
                                onChange={(e) => setBpTherapy(e.target.checked)}
                            />
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex max-md:flex-col gap-[30px] w-full">
                        <Button
                            theme="default"
                            text="Рассчитать"
                            onClick={handleCalculate}
                            disabled={!isFormValid}
                            className='w-full'
                        />
                        <Button
                            theme="light"
                            text="Сбросить"
                            onClick={handleReset}
                            className='w-full'
                        />
                    </div>
                </div>

                {/* Right: result gauge */}
                <div className="bg-white border border-background-secondary rounded-[5px] p-[40px] max-md:p-[20px] flex flex-col items-center gap-[20px] h-full w-full">
                    <span className="font-h4 font-heading text-accent text-center uppercase text-nowrap">Итоговый результат</span>

                    {hasCalculated ? (
                        <>
                            <Scale
                                value={finalScore}
                                min={0}
                                max={100}
                                size={346}
                            />
                            <p className="font-h5 font-heading text-text-primary text-center uppercase">{interpretation.level}</p>
                            <p className="font-p-sm text-text-primary leading-[120%]">
                                {interpretation.desc}
                            </p>
                        </>
                    ) : (
                        <>
                            <Scale
                                value={0}
                                min={0}
                                max={100}
                                size={346}
                                label="—"
                            />
                            <p className="font-h5 font-heading text-text-primary text-center uppercase">Ожидание расчёта...</p>
                            <p className="font-p-sm text-text-primary leading-[120%]">
                                Заполните все диагностические факторы слева и нажмите кнопку «Рассчитать» для визуализации данных на датчиках.
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Individual gauges grid */}
            {hasCalculated && (
                // <section className="mt-16">
                <div className="grid max-md:grid-cols-1 max-xl:grid-cols-2 grid-cols-4 gap-[30px]">
                    {gauges.map(({ label, score }) => (
                        <div
                            key={label}
                            className="bg-white border border-background-secondary rounded-[5px] p-[40px] flex flex-col items-center gap-[20px] "
                        >
                            <span className="font-h5 font-heading text-accent text-center uppercase">{label}</span>
                            <Scale value={score} min={0} max={100} size={230} />
                        </div>
                    ))}
                </div>
                // </section>
            )}

            {/* Recommendations */}
            {hasCalculated && (
                <div className="flex flex-col gap-[40px] max-md:gap-[20px]">
                    <h3 className="font-h3 uppercase text-heading">
                        Рекомендации
                    </h3>
                    <FAQAccordion items={accordionItems} multiple />
                </div>
            )}

            {/* Save PDF */}
            {hasCalculated && (
                <div className="mt-10">
                    <Button
                        theme="default"
                        text="Сохранить результат в PDF"
                        onClick={() => window.print()}
                        className="w-full"
                    />
                </div>
            )}
        </Section>
    );
}