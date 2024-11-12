import { Modal, ModalContent, ModalTrigger, ModalPortal, ModalOverlay } from "@layer-ui/modal";
import { overlayStyle, modalStyle, modalContentStyle } from "./index.css.ts";

export default function ModalPage() {
  return (
    <Modal>
      <ModalTrigger>OPEN</ModalTrigger>
      <ModalPortal>
        <ModalOverlay className={overlayStyle} />
        <ModalContent className={modalStyle}>
          <div className={modalContentStyle}>모달 내용</div>
        </ModalContent>
      </ModalPortal>
    </Modal>
  );
}
