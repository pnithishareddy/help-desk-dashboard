function Modal({
  title,
  message,
  onConfirm,
  onCancel
}) {

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-icon">
          ⚠️
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">

          <button
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="danger-button"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default Modal;