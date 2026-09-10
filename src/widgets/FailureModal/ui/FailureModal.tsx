import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";

export const FailureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOutsideClick>
        <div className="flex flex-col gap-5 p-6">
            <h3 className="font-h3 text-red-500 text-center">Ошибка отправки</h3>
            <p className="font-p text-text-main text-center">Не получилось отправить отклик. Пожалуйста, повторите попытку позже.</p>
            <Button theme="default" text="Закрыть" onClick={onClose} className="w-full mt-4" />
        </div>
    </Modal>
);