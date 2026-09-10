import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";
import { Button } from "@/shared/ui/Button";

interface UsefulMaterialCard {
  image: string;
  title: string;
  description: string;
  type: string;
  link: string;
}

export const UsefulMaterialCard = (props: UsefulMaterialCard) => {
  const { image, title, description, type, link } = props

  return (
    <div className="flex flex-col rounded-[5px] overflow-hidden 
      bg-white border border-background-secondary 
      xl:max-w-[426px] w-full h-full 
      hover:border-accent hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full h-[300px] overflow-hidden bg-background-secondary shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[24px] left-[24px] px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight uppercase">{type}</div>
      </div>
      <div className='flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] h-full'>
        <div className='flex flex-col gap-[16px] w-full'>
          <h4 className='font-h4 text-heading uppercase line-clamp-3 max-md:line-clamp-2'>{title}</h4>
          <p className='font-p-sm text-text-primary w-full line-clamp-4 max-md:line-clamp-2 leading-[120%]'>{description}</p>
        </div>
        <Button theme='default' text="Пройти тест" icon={ArrowRight} onClick={() => location.replace(link)} />
      </div>
    </div>
  );
};
