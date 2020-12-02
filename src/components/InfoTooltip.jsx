import React from 'react';
import PropTypes from 'prop-types';

function InfoTooltip({ isOpen, title, type, onClose }) {
  let popupStyle = `popup`;
  if (isOpen) {
    popupStyle += ' popup_opened';
  }

  let iconImageStyle;
  switch (type) {
    case 'ok':
      iconImageStyle = 'popup__info-icon popup__info-icon_type_ok';
      break;
    case 'error':
      iconImageStyle = 'popup__info-icon popup__info-icon_type_error';
      break;
    default:
      iconImageStyle = 'popup__info-icon';
      break;
  }

  const handleClosePopupByClickOutside = (evt) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return (
    <div className={popupStyle} role="presentation" onClick={handleClosePopupByClickOutside}>
      <div className="popup__container popup__container_type_inform">
        <button
          type="button"
          aria-label="Закрыть информационное всплывающее окно"
          className="popup__close-icon"
          onClick={onClose}
        />
        <div className={iconImageStyle} />
        <p className="popup__informSubtitle">{title}</p>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.oneOf(['ok', 'error']),
  onClose: PropTypes.func.isRequired,
};

InfoTooltip.defaultProps = {
  isOpen: false,
  title: '',
  type: '',
};

export default InfoTooltip;
