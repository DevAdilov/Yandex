import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modaloverlay";
import { useEffect } from "react";

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

function Modal({ isOpen, children, setIsModalOpen, headerTitleModal }) {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === "Escape" || e.keyCode === 27) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay isOpen={isOpen} propsSetIsModalOpen={setIsModalOpen} />
      <div className={styles.modalBlock}>
        <div className={styles.headerModalBlock}>
          <p className="text text_type_main-large">
            {headerTitleModal ? headerTitleModal : false}
          </p>
          <CloseIcon type="primary" onClick={() => setIsModalOpen(false)} />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("burger-modals")
  );
}

export default Modal;
