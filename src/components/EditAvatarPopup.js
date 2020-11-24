import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onSubmit }) {
  const avatarInput = useRef(null);

  const handleEditAvatarFormSubmit = (buttonRef) => {
    const cleanUp = () => {
      avatarInput.current.value = "";
    };
    onSubmit(avatarInput.current.value, buttonRef, cleanUp);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleEditAvatarFormSubmit}
      inputs={
        <>
          <label className="popup__form-label">
            <input
              id="avatar-form_src"
              name="avatar-form_src"
              type="url"
              required
              placeholder="Ссылка на аватар"
              className="popup__input-text avatar-form__input-text_type_src"
              ref={avatarInput}
            />
            <span id="avatar-form_src-error" className="popup__input-error" />
          </label>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
