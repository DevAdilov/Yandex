import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modaloverlay";

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

function Modal({ isOpen, children, setIsModalOpen, headerTitleModal }) {
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
