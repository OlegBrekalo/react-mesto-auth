import React from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/currentUser";

function Main({ handlersProfile, cards, handlersCard }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile content-section">
        <div className="profile__avatar-wrapper">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
            onClick={() => handlersProfile.setOpenEditAvatar(true)}
          />
        </div>
        <div className="profile__profile-info">
          <h2 className="profile__name">{currentUser.name}</h2>
          <button
            type="button"
            className="profile__edit-button"
            onClick={() => handlersProfile.setOpenEditProfile(true)}
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={() => handlersProfile.setOpenAddPlace(true)}
        />
      </section>
      <section className="elements content-section">
        <ul className="elements__img-grid">
          {cards.map(({ _id, ...item }) => (
            <Card
              key={_id}
              id = {_id}
              {...item}
              onClick={handlersCard.click}
              onLike={handlersCard.like}
              onDelete={handlersCard.delete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
