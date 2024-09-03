import ReactDOM from "react-dom";
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
};

function ModalOverlay({ isOpen, propsSetIsModalOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={() => propsSetIsModalOpen(false)}
    ></div>,
    document.getElementById("burger-modals")
  );
}
export default ModalOverlay;
