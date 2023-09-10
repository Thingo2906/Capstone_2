import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faMinus,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieActionForList.css";

function MovieActionForList({
  id,
  name,
  handleClick,
  removeMovieFromList,
  handleInfo,
}) {
  async function handleRemove(evt) {
    evt.preventDefault();
    await removeMovieFromList(id);
  }

  return (
    <div className="action">
      <FontAwesomeIcon
        className="action-icon"
        icon={faPlay}
        onClick={() => handleClick(name, id)}
      />
      <FontAwesomeIcon className="icon" icon={faMinus} onClick={handleRemove} />
      <FontAwesomeIcon
        className="icon"
        icon={faCircleInfo}
        onClick={() => handleInfo(id)}
      />
    </div>
  );
}
export default MovieActionForList;
