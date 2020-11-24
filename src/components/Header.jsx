import React from 'react';
import logo from '../images/mesto-logo.svg';

function Header() {
  return (
    <header className="header content-section">
      <img src={logo} alt="Место-Логотип" className="header__logo" />
    </header>
  );
}

export default Header;
