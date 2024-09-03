import ReactDOM from "react-dom";
import "./modal.css";
import PropTypes from "prop-types";

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.array,
};

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-block">{children}</div>,
    document.getElementById("burger-modals")
  );
}

export default Modal;
