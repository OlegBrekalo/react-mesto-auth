import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/currentUser';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

import PopupWithImage from './PopupWithImage';

import '../index.css';
import api from '../utils/api';

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [cardIdPrepareForRemove, setCardIdPrepareForRemove] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    id: '',
    name: '',
    about: '',
    avatar: '',
  });

  // First Init

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((data) => {
        const [userInfo, initCards] = data;
        setCards(initCards);
        setCurrentUser({
          id: userInfo._id,
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
        });
      })
      .catch((err) => {
        console.log('Error on - First Init');
        console.log(`Error message - ${err}`);
      });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      closeAllPopups();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, [isEditProfileOpen, isAddPlaceOpen, isEditAvatarOpen, selectedCard]);

  const closeAllPopups = () => {
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);

    setCardIdPrepareForRemove(null);
    setSelectedCard(null);

    document.removeEventListener('keydown', handleKeyPress);
  };

  // #region Cards and handlers

  const handeCardClick = (link, name) => {
    setSelectedCard({
      src: link,
      subtitle: name,
    });
  };

  const mapNewCards = (idCard, cardJSON) => {
    setCards(
      cards.map((card) => {
        if (card._id === idCard) {
          return { ...card, likes: cardJSON.likes };
        }
        return card;
      }),
    );
  };

  const handleCardLike = (isAlreadyLike, idCard) => {
    if (!isAlreadyLike) {
      api
        .putLike(idCard)
        .then((cardJSON) => {
          mapNewCards(idCard, cardJSON);
        })
        .catch((err) => {
          console.log('Error on - putLike');
          console.log(`Error message - ${err}`);
        });
    } else {
      api
        .removeLike(idCard)
        .then((cardJSON) => {
          mapNewCards(idCard, cardJSON);
        })
        .catch((err) => {
          console.log('Error on - removeLike');
          console.log(`Error message - ${err}`);
        });
    }
  };

  const handleCardDelete = (cardId) => {
    setCardIdPrepareForRemove(cardId);
  };
  // #endregion

  // #region Forms Submit Handlers
  const handleUpdateUserProfile = (name, about, ref) => {
    const oldButtonCaption = ref.current.textContent;
    const buttonRef = ref;
    buttonRef.current.textContent = 'Сохраняю...';
    api
      .updateUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about,
        });
        buttonRef.current.textContent = oldButtonCaption;
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Error on - handleUpdateUserProfile');
        console.log(`Error message - ${err}`);
      });
  };

  const handleUpdateUserAvatar = (newAvatar, ref, cleanUp) => {
    const oldButtonCaption = ref.current.textContent;
    const buttonRef = ref;
    buttonRef.current.textContent = 'Сохраняю...';
    api
      .updateUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        buttonRef.current.textContent = oldButtonCaption;
        cleanUp();
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Error on - handleUpdateUserAvatar');
        console.log(`Error message - ${err}`);
      });
  };

  const handleAddPlaceSubmit = (newName, newSrc, ref, cleanUp) => {
    const oldButtonCaption = ref.current.textContent;
    const buttonRef = ref;
    buttonRef.current.textContent = 'Создаю...';
    api
      .addNewCard(newName, newSrc)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        buttonRef.current.textContent = oldButtonCaption;
        cleanUp();
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Error on - handleAddPlaceSubmit');
        console.log(`Error message - ${err}`);
      });
  };

  const handleRemovePlaceSubmit = (ref) => {
    const oldButtonCaption = ref.current.textContent;
    const buttonRef = ref;
    buttonRef.current.textContent = 'Удаляю...';
    api
      .deleteCard(cardIdPrepareForRemove)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardIdPrepareForRemove));
        buttonRef.current.textContent = oldButtonCaption;
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Error on - handleRemovePlaceSubmit');
        console.log(`Error message - ${err}`);
      });
  };

  // #endregion
  return (
    <div className="content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        {cards.length !== 0 && (
          <Main
            cards={cards}
            handlersProfile={{
              setOpenEditProfile: setEditProfileOpen,
              setOpenEditAvatar: setEditAvatarOpen,
              setOpenAddPlace: setAddPlaceOpen,
            }}
            handlersCard={{
              click: handeCardClick,
              like: handleCardLike,
              delete: handleCardDelete,
            }}
          />
        )}
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUserProfile}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUserAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <ConfirmDeletePopup
          isOpen={!!cardIdPrepareForRemove}
          onClose={closeAllPopups}
          onSubmit={handleRemovePlaceSubmit}
        />
        <PopupWithImage
          isOpen={!!selectedCard}
          src={selectedCard ? selectedCard.src : ''}
          subtitle={selectedCard ? selectedCard.subtitle : ''}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
