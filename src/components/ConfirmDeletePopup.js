import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onSubmit }) {

  const handleConfirmDeleteFormSubmit = (buttonRef) => {
    onSubmit(buttonRef);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Вы уверены?"
      name="delete-card"
      buttonText="Да"
      onClose={onClose}
      onSubmit={handleConfirmDeleteFormSubmit}
    />
  );
}

export default ConfirmDeletePopup;
