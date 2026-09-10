// SpecialistCard.tsx
import { Button } from '@/shared/ui/Button';

interface SpecialistCardProps {
    image: string;
    specialty: string;
    index: string; // номер (01, 02, ...)
    name: string;
    onAppointment?: () => void;
}

export const SpecialistCard = (props: SpecialistCardProps) => {
    const {
        image,
        specialty,
        index,
        name,
        onAppointment,
    } = props;

    return (
        <div className="flex flex-col gap-[24px] bg-transparent w-full xl:max-w-[428px] h-full group">
            {/* Фото */}
            <div className="w-full h-[520px] max-md:h-[420px] overflow-hidden bg-background-secondary rounded-[4px] shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
            </div>

            <div className='flex flex-col justify-between gap-[24px] h-full'>
                <div className="flex flex-col gap-[16px]">
                    {/* Мета: специальность + номер */}
                    <div className="flex items-center justify-between">
                        <span className="font-lbl-number text-accent uppercase">
                            {specialty}
                        </span>
                        <span className="font-lbl-number text-design-elements">
                            {index}
                        </span>
                    </div>

                    {/* Имя */}
                    <h4 className="font-h4 text-heading uppercase">
                        {name}
                    </h4>
                </div>
                {/* Кнопка */}
                <Button
                    theme='default'
                    onClick={onAppointment}
                    className="w-full"
                    text='Записаться'
                />
            </div>
        </div>
    );
};