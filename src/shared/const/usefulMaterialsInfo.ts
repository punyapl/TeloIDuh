import { getRouteDepressionScale, getRouteHeartHealthCalc, getRouteStopBangQuiz } from './router'
import Calculator1 from "@/shared/assets/images/Calculator1.webp"
import Calculator2 from "@/shared/assets/images/Calculator2.webp"
import Calculator3 from "@/shared/assets/images/Calculator3.webp"

export const usefulMaterials = [
    {
        title: "Калькулятор сердечно-сосудистого здоровья",
        image: Calculator1,
        description: 'Основанный на концепции Life Essential 8 от Американской Ассоциации Сердца.',
        type: 'Калькулятор',
        link: getRouteHeartHealthCalc(),
    },
    {
        title: "Опросник STOP-BANG",
        image: Calculator2,
        description: 'Оцените свой риск развития синдрома обструктивного апноэ сна с помощью простого и точного опросника — первого шага к спокойному и здоровому сну.',
        type: 'Тест',
        link: getRouteStopBangQuiz(),
    },
    {
        title: "Шкала депрессии Бека II (BDI-II)",
        image: Calculator3,
        description: 'Оцените выраженность депрессивных симптомов',
        type: 'Тест',
        link: getRouteDepressionScale(),
    },
]