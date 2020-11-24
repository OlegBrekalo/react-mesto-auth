import React, {useRef} from "react";

function PopupWithForm({ isOpen, title, name, inputs, buttonText, onClose, onSubmit }) {
  const buttonRef = useRef(null);

  let popupStyle = `popup popup-${name}`;
  if (isOpen) {
    popupStyle += " popup_opened";
  }

  const handleSubmitForm = (evt) =>{
    evt.preventDefault();

    onSubmit(buttonRef);
  }

  const handleClosePopupByClickOutside = (evt) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return (
    <div className={popupStyle} onClick={handleClosePopupByClickOutside}>
      <div className="popup__container popup__container_type_form">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <p className="popup__title">{title}</p>
        <form
          className="popup__form"
          autoComplete="off"
          onSubmit={handleSubmitForm}
        >
          {inputs}
          <button
            type="submit"
            className="popup__submit-button"
            ref={buttonRef}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
