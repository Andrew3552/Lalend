import React from "react";
import "./Modal.scss";

export default function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p dangerouslySetInnerHTML={{ __html: message }} />
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
