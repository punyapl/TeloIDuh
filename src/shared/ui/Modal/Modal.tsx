import { ReactNode, useEffect, useRef, } from 'react'
import XMark from '@/shared/assets/icons/XMark.svg'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Icon, } from '../Icon'

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    closeOnOutsideClick?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = (props: ModalProps) => {
    const {
        isOpen,
        onClose,
        title,
        children,
        closeOnOutsideClick = true,
        size = 'md',
    } = props
    const { isMobile, } = useDevice()

    const dialogRef = useRef<HTMLDialogElement>(null);

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-[700px]',
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {

            dialog.showModal();

            document.body.classList.add('overflow-hidden');
        } else {

            dialog.close();

            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen,]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (!closeOnOutsideClick) return;

        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 bg-transparent w-max h-max backdrop:w-screen 
                backdrop:h-screen backdrop:bg-black/30 backdrop:backdrop-blur-sm open:flex 
                justify-self-center self-center transition-all delay-100 duration-500 ease-in-out 
                opacity-0 open:opacity-100"
            onClose={onClose}
        >
            <div
                className={
                    `relative bg-background p-8 rounded-[5px] shadow-xl w-full 
                    ${sizeClasses[size]} max-h-[90vh] overflow-hidden flex 
                    flex-col gap-[16px]`
                }
            >
                <div className={`flex ${title ? 'justify-between' : 'justify-end'} items-center`}>
                    <h3 className="font-h3 text-heading">{title}</h3>
                    <Icon
                        Svg={XMark}
                        width={isMobile ? 25 : 30}
                        height={isMobile ? 25 : 30}
                        className="stroke-2 stroke-text-primary"
                        onClickCapture={() => onClose()}
                    />
                </div>
                <div className="pr-2 overflow-y-auto scrollbar-primary max-h-[calc(90vh-7rem)]">
                    {children}
                </div>
            </div>
        </dialog>
    )
}