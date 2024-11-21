import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { Modal, ModalTrigger, ModalContent } from "./Modal";

const OPEN_TEXT = "열기";
const CLOSE_TEXT = "닫기";
const TITLE_TEXT = "제목";
const CONTENT_TEXT = "내용";

const ModalTest = (props: React.ComponentProps<typeof Modal>) => (
  <Modal {...props}>
    <ModalTrigger>{OPEN_TEXT}</ModalTrigger>
    <ModalContent>
      <h2 id="modal-title">{TITLE_TEXT}</h2>
      <p id="modal-description">{CONTENT_TEXT}</p>
      <ModalTrigger>{CLOSE_TEXT}</ModalTrigger>
    </ModalContent>
  </Modal>
);

describe("Modal 컴포넌트", () => {
  const user = userEvent.setup();
  describe("트리거 클릭 후", () => {
    it("모달이 열려야 함", async () => {
      render(<ModalTest />);
      const trigger = await screen.findByText(OPEN_TEXT);

      await user.click(trigger);

      expect(trigger).toBeInTheDocument();
    });

    it("모달이 닫혀야 함", () => {
      const rendered = render(<ModalTest />);
      fireEvent.keyDown(document.activeElement!, { key: "Escape" });
      expect(rendered.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
    });
  });

  describe("제어 모드", () => {
    it("onOpenChange가 호출되어야 함", () => {
      const handleOpenChange = vi.fn();

      const rendered = render(<ModalTest open={true} onOpenChange={handleOpenChange} />);

      fireEvent.click(rendered.getByText(OPEN_TEXT));
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("모달 비활성화", async () => {
    it("모달이 열려야 함", async () => {
      const onChangeMock = vi.fn();

      const rendered = render(<ModalTest modal={false} onOpenChange={onChangeMock} />);
      const trigger = rendered.getByText(OPEN_TEXT);
      expect(rendered.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();

      await user.click(trigger);

      const content = rendered.getByText(CONTENT_TEXT);
      const close = rendered.getByText(CLOSE_TEXT);

      expect(content).toBeInTheDocument();
      expect(close).toBeInTheDocument();

      expect(onChangeMock).toHaveBeenCalledWith(true);
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });
});
