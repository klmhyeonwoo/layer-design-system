import { Modal, ModalContent, ModalTrigger, ModalPortal, ModalOverlay } from "@layer-ui/modal";
import { overlayStyle, modalStyle, modalContentStyle } from "./index.css.ts";

export default function ModalPage() {
  return (
    <Modal>
      <ModalTrigger>OPEN</ModalTrigger>
      <ModalPortal>
        <ModalOverlay className={overlayStyle} />
        <ModalContent className={modalStyle}>
          <div className={modalContentStyle}>
            모달 내용
            <Modal>
              <ModalTrigger asChild>
                <button>중첩 모달 OPEN</button>
              </ModalTrigger>
              <ModalPortal>
                <ModalOverlay className={overlayStyle} />
                <ModalContent className={modalStyle}>
                  <ModalTrigger>2 depth</ModalTrigger>
                  <ModalTrigger>2 depth</ModalTrigger>
                  <ModalTrigger>2 depth</ModalTrigger>
                  <ModalTrigger>2 depth</ModalTrigger>
                  <ModalTrigger>2 depth</ModalTrigger>
                  <ModalTrigger>2 depth</ModalTrigger>
                  <ModalTrigger>2 depth</ModalTrigger>
                </ModalContent>
              </ModalPortal>
            </Modal>
            <ModalTrigger>1 depth</ModalTrigger>
            <ModalTrigger>1 depth</ModalTrigger>
            <ModalTrigger>1 depth</ModalTrigger>
            <ModalTrigger>1 depth</ModalTrigger>
            <ModalTrigger>1 depth</ModalTrigger>
            <ModalTrigger>1 depth</ModalTrigger>
            <ModalTrigger>1 depth</ModalTrigger>
          </div>
          <ModalTrigger>CLOSE</ModalTrigger>
        </ModalContent>
      </ModalPortal>
    </Modal>
  );
}
