import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";

export const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOutsideClick>
        <div className="flex flex-col gap-5 p-6">
            <h3 className="font-h3 text-heading text-center">Заявка успешно отправлена!</h3>
            <p className="font-p text-text-main text-center">Мы свяжемся с вами в ближайшее время</p>
            <Button theme="default" text="Отлично" onClick={onClose} className="w-full mt-4" />
        </div>
    </Modal>
);