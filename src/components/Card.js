import React from "react";
import { onErrorMockImage } from "../utils/constants";
import { CurrentUserContext } from "../contexts/currentUser";

function Card({ id, name, link, likes, owner, onClick, onLike, onDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = !!(
    likes.length !== 0 &&
    likes.find((like) => {
      return like._id === currentUser.id;
    })
  );

  const removeIconStyle =
    currentUser.id === owner._id
      ? "element__remove-icon  element__remove-icon_show"
      : "element__remove-icon";
  const likeIconStyle = isLiked
    ? "element__like-icon element__like-icon_checked"
    : "element__like-icon";

  return (
    <li className="element">
      <button type="button" className={removeIconStyle} onClick={()=>{onDelete(id)}}></button>
      <img
        src={link}
        alt="#"
        className="element__image"
        onClick={() => {
          onClick.call(this, link, name);
        }}
        onError={(evt) => {
          evt.target.src = onErrorMockImage;
        }}
      />
      <div className="element__footer">
        <h2 className="element__title" title={name}>
          {name}
        </h2>
        <div className="element__like-block">
          <button
            type="button"
            className={likeIconStyle}
            onClick={() => {
              onLike(isLiked, id);
            }}
          ></button>
          <p className="element__like-couter">{likes ? likes.length : 0}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
