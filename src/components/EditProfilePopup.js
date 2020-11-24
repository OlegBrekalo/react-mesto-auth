import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/currentUser";

function EditProfilePopup({ isOpen, onClose, onSubmit }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleEditProfileFormSubmit(buttonRef) {
    onSubmit(name, about, buttonRef);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleEditProfileFormSubmit}
      inputs={
        <>
          <label className="popup__form-label">
            <input
              id="edit-form_name"
              name="edit-form_name"
              type="text"
              required
              minLength={2}
              maxLength={40}
              className="popup__input-text edit-popup__input-text_type_name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            <span id="edit-form_name-error" className="popup__input-error" />
          </label>
          <label className="popup__form-label">
            <input
              id="edit-form_about"
              name="edit-form_about"
              type="text"
              required
              minLength={2}
              maxLength={200}
              className="popup__input-text edit-popup__input-text_type_job"
              value={about}
              onChange={(evt) => setAbout(evt.target.value)}
            />
            <span id="edit-form_about-error" className="popup__input-error" />
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
