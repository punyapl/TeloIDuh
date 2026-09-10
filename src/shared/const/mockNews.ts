import { ArticleItem } from '@/entities/Article'


const t = (text: string) => ({ type: 'text' as const, text })
const tb = (text: string) => ({ type: 'text' as const, text, bold: true })

export const MOCK_NEWS: ArticleItem[] = [
    {
        id: 1,
        documentId: 'abc123xyz001',
        title: 'Компания открывает новый офис в Москве',
        slug: 'novyj-ofis-v-moskve',
        shortDescription: 'Мы рады сообщить об открытии нашего нового офиса в центре Москвы.',
        date: '2025-06-01T10:00:00.000Z',
        theme: 'Компания',
        image: {
            url: 'https://picsum.photos/seed/news1/800/450',
            alternativeText: 'Новый офис компании в Москве',
            name:'aa'
        },
        content: [
            {
                type: 'heading',
                level: 2,
                children: [t('Новый этап развития')],
            },
            {
                type: 'paragraph',
                children: [
                    t('После двух лет работы в удалённом формате мы наконец открываем '),
                    tb('физическое представительство'),
                    t(' в сердце столицы.'),
                ],
            },
            {
                type: 'quote',
                children: [t('Это не просто офис — это место, где рождаются идеи. — Алексей Громов, CEO')],
            },
            {
                type: 'list',
                format: 'unordered',
                children: [
                    { type: 'list-item', children: [t('Переговорные комнаты на 50 мест')] },
                    { type: 'list-item', children: [t('Зона отдыха и коворкинг')] },
                    { type: 'list-item', children: [t('Собственная серверная инфраструктура')] },
                ],
            },
        ],
    },
    {
        id: 2,
        documentId: 'abc123xyz002',
        title: 'Запуск обновлённой платформы: что нового',
        slug: 'zapusk-obnovlyonnoj-platformy',
        shortDescription: 'Платформа получила новый интерфейс, улучшенную производительность и ряд ключевых функций.',
        date: '2025-05-20T09:30:00.000Z',
        theme: 'Продукт',
        image: {
            url: 'https://picsum.photos/seed/news2/800/450',
            alternativeText: 'Скриншот обновлённого интерфейса платформы',
            name:'aa'
        },
        content: [
            {
                type: 'heading',
                level: 2,
                children: [t('Что изменилось')],
            },
            {
                type: 'paragraph',
                children: [t('Мы переработали архитектуру фронтенда и оптимизировали запросы к базе данных. Время загрузки снизилось на 40%.')],
            },
            {
                type: 'list',
                format: 'ordered',
                children: [
                    { type: 'list-item', children: [t('Переход на React 19 и Server Components')] },
                    { type: 'list-item', children: [t('Новая система уведомлений в реальном времени')] },
                    { type: 'list-item', children: [t('Редизайн дашборда пользователя')] },
                    { type: 'list-item', children: [t('Экспорт данных в CSV и PDF')] },
                ],
            },
            {
                type: 'quote',
                children: [t('Мы строили это для пользователей, а не ради метрик. — Команда продукта')],
            },
        ],
    },
    {
        id: 3,
        documentId: 'abc123xyz003',
        title: 'Итоги конференции DevFest 2025',
        slug: 'itogi-devfest-2025',
        shortDescription: 'Наша команда выступила на DevFest с докладом о микрофронтендах и собрала полный зал.',
        date: '2025-04-15T14:00:00.000Z',
        theme: 'События',
        image: {
            url: 'https://picsum.photos/seed/news3/800/450',
            alternativeText: 'Выступление на конференции DevFest 2025',
            name:'aa'
        },
        content: [
            {
                type: 'heading',
                level: 2,
                children: [t('О конференции')],
            },
            {
                type: 'paragraph',
                children: [
                    t('DevFest 2025 собрал более '),
                    tb('3 000 участников'),
                    t(' из 15 стран. Наш доклад вошёл в топ-5 по рейтингу посещаемости.'),
                ],
            },
            {
                type: 'heading',
                level: 3,
                children: [t('Основные тезисы доклада')],
            },
            {
                type: 'list',
                format: 'ordered',
                children: [
                    { type: 'list-item', children: [t('Когда микрофронтенды оправданы, а когда — нет')] },
                    { type: 'list-item', children: [t('Module Federation в production: реальный опыт')] },
                    { type: 'list-item', children: [t('Подводные камни независимого деплоя')] },
                ],
            },
            {
                type: 'paragraph',
                children: [t('Слайды и запись доступны на нашем YouTube-канале.')],
            },
        ],
    },
    {
        id: 4,
        documentId: 'abc123xyz004',
        title: 'Партнёрство с EcoTech Solutions',
        slug: 'partnyorstvo-s-ecotech-solutions',
        shortDescription: 'Мы подписали соглашение о стратегическом партнёрстве с EcoTech Solutions.',
        date: '2025-03-05T11:00:00.000Z',
        theme: 'Партнёрства',
        image: {
            url: 'https://picsum.photos/seed/news4/800/450',
            alternativeText: 'Подписание партнёрского соглашения',
            name:'aa'
        },
        content: [
            {
                type: 'paragraph',
                children: [t('Соглашение охватывает совместную разработку инструментов для экологического мониторинга и анализа данных.')],
            },
            {
                type: 'quote',
                children: [t('Технологии должны служить планете, а не только прибыли. — Мария Лесникова, CTO EcoTech')],
            },
            {
                type: 'heading',
                level: 3,
                children: [t('Направления сотрудничества')],
            },
            {
                type: 'list',
                format: 'unordered',
                children: [
                    { type: 'list-item', children: [t('Разработка IoT-сенсоров для мониторинга воздуха')] },
                    { type: 'list-item', children: [t('Платформа визуализации экологических данных')] },
                    { type: 'list-item', children: [t('Обмен экспертизой в области ML-моделей')] },
                ],
            },
        ],
    },
]