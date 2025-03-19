import React from "react";
import "./Groups.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlusBtn,
  setSelectedGroup,
  setShowNotes,
} from "../../Redux/NoteSlice";

const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.notedata.groups);

  const handleClick = (group) => {
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const updatedGroup = groups.find((g) => g.id === group.id) || group;
    dispatch(setSelectedGroup(updatedGroup));
    if (window.innerWidth < 600) {
      dispatch(setShowNotes(true));
    }
  };

  return (
    <div className="groupContainer">
      <span>Pocket Notes</span>
      <div className="groupSection">
        {groups.map((group, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(group)}
              className="group"
            >
              <div style={{ background: group.color }} className="initial">
                {group.initials}
              </div>
              <div className="groupName">{group.name}</div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => dispatch(setPlusBtn(true))}
        className="addGroupBtn"
      >
        +
      </button>
    </div>
  );
};

export default Groups;
