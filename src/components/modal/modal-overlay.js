import ReactDOM from "react-dom";
import styles from "./modal.module.css";

function ModalOverlay({ closeModal }) {
  return (
    <div className={styles.modalOverlay} onClick={() => closeModal()}></div>
  );
}
export default ModalOverlay;
