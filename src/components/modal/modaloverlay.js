import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  propsSetIsModalOpen: PropTypes.func.isRequired,
};

function ModalOverlay({ isOpen, propsSetIsModalOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      onClick={() => propsSetIsModalOpen(false)}
    ></div>,
    document.getElementById("burger-modals")
  );
}
export default ModalOverlay;