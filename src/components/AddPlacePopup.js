import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [newName, setNewName] = React.useState("");
  const [newSrc, setNewSrc] = React.useState("");


  const handleAddPlaceFormSubmit = (buttonRef) => {
    const cleanUp = () => {
      setNewName("");
      setNewSrc("");
    };
    onSubmit(newName, newSrc, buttonRef, cleanUp);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="add"
      buttonText="Создать"
      onClose={onClose}
      onSubmit={handleAddPlaceFormSubmit}
      inputs={
        <>
          <label className="popup__form-label">
            <input
              id="add-form_name"
              name="add-form_name"
              type="text"
              required
              minLength={1}
              maxLength={30}
              placeholder="Название"
              className="popup__input-text add-form__input-text_type_name"
              value={newName}
              onChange={(evt) => setNewName(evt.target.value)}
            />
            <span id="add-form_name-error" className="popup__input-error" />
          </label>
          <label className="popup__form-label">
            <input
              id="add-form_src"
              name="add-form_src"
              type="url"
              required
              placeholder="Ссылка на картинку"
              className="popup__input-text add-form__input-text_type_src"
              value={newSrc}
              onChange={(evt) => setNewSrc(evt.target.value)}
            />
            <span id="add-form_src-error" className="popup__input-error" />
          </label>
        </>
      }
    />
  );
}

export default AddPlacePopup;
