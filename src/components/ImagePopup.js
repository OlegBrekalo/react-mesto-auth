import React from "react";

function ImagePopup() {
  return (
    <div class="popup-img popup">
      <div class="popup__container">
        <button type="button" class="popup__close-icon"></button>
        <img src="#" alt="#" class="popup__image" />
        <p class="popup__img-subtitle"></p>
      </div>
    </div>
  );
}

export default ImagePopup;
