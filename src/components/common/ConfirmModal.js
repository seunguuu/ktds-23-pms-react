// 박상걸
/** 사용할 장소에 다음과 같이 state를 만드시고 진행하시면 됩니다!! 문의는 박상걸을 찾아주세요
 * 
 * function App() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = () => {
    console.log("안녕해주셔서 감사합니다~!!");
    setShowConfirmModal(false);
  };

  return (
    <>
      <div>ktds-23-pms-react</div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <button onClick={handleOpenConfirmModal}>Open Confirm</button>
      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        content="안녕"
        closeContent="안녕"
      />
      <ConfirmModal
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        content="안녕하시나요?"
        cancelContent="아니오"
        confirmContent="예"
        confirmOnClick={handleConfirm}
      />
    </>
  );
}

export default App;

 * 
 */
import React from "react";

const ConfirmModal = React.memo(
  ({
    content,
    onClose,
    show,
    cancelContent,
    confirmContent,
    confirmOnClick,
  }) => {
    if (!show) {
      return null;
    }

    return (
      <dialog
        open
        className="modal-window"
        role="alertdialog"
        aria-modal="true"
      >
        <div className="grid-modal">
          <div
            className="modal-close"
            onClick={onClose}
            role="button"
            aria-label="Close modal"
            style={{ cursor: "pointer" }}
          >
            X
          </div>
          <div className="modal-content">
            <div className="modal-text">{content}</div>
          </div>
          <div className="input-space">
            <button className="confirm-button button" onClick={confirmOnClick}>
              {confirmContent}
            </button>
            <button className="confirm-button button" onClick={onClose}>
              {cancelContent}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
export default ConfirmModal;
