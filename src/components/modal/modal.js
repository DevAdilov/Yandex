import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modaloverlay";
import { useEffect } from "react";

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

function Modal({ children, setIsModalOpen, headerTitleModal }) {
  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay propsSetIsModalOpen={setIsModalOpen} />
      <div className={styles.modalBlock}>
        <div className={styles.headerModalBlock}>
          <p className="text text_type_main-large">
            {headerTitleModal ? headerTitleModal : false}
          </p>
          <CloseIcon
            type="primary"
            onClick={() => {
              closeModal();
            }}
          />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("burger-modals")
  );
}

export default Modal;
