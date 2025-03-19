import React, { useEffect, useState } from "react";
import bg_img from "../../assets/bg_image.png";
import encrypt_icon from "../../assets/Vector.png";
import "./Mynotes.css";
import NotesCard from "../NotesCard/NotesCard";
import diabledSend from "../../assets/disabledSend.png";
import enabledSend from "../../assets/enabledSend.png";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, setSelectedGroup, setShowNotes } from "../../Redux/NoteSlice";

const Mynotes = () => {
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(setShowNotes(false));
  };

  //selected group
  const selectedGroup = useSelector((state) => state.notedata.selectedGroup);
  const notesCollection = selectedGroup.notes || [];

  //getting the notes input
  const [notesData, setNotesData] = useState({
    notes: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setNotesData({ ...notesData, notes: e.target.value });
  };

  //updating notes
  const handleClick = () => {
    if (notesData.notes.trim() === "") return;
    const newNote = {
      notes: notesData.notes,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };


    //getting, matching and setting the selectedgroup data to the localstorage
    const groups = JSON.parse(localStorage.getItem("groups")) || [];

    //matching and setting
    const update_Groups = groups.map((group) => {
      return group.id === selectedGroup.id
        ? {
            ...group,
            notes: group.notes ? [...group.notes, newNote] : [newNote],
          }
        : group;
    });
    localStorage.setItem("groups", JSON.stringify(update_Groups));

    dispatch(
      setSelectedGroup({
        ...selectedGroup,
        notes: selectedGroup.notes
          ? [...selectedGroup.notes, newNote]
          : [newNote],
      })
    );

    dispatch(setGroups(update_Groups));
    // Reset input
    setNotesData({ notes: "", date: "", time: "" });
  };

  //enter key
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      {selectedGroup.name ? (
        <div className="mynotesContainer ">
          <div className="header">
            {window.innerWidth < 600 && (
              <p onClick={handleBackClick} className="backArrow">&larr;</p>
            )}
            <div
              style={{ backgroundColor: selectedGroup.color }}
              className="initial"
            >
              {selectedGroup.initials}
            </div>
            <div className="groupName">{selectedGroup.name}</div>
          </div>
          <div className="notesSection">
            {notesCollection &&
              notesCollection.map((note, index) => (
                <NotesCard key={index} {...note} />
              ))}
          </div>
          <div className="inputSection">
            <textarea
              onKeyDown={onEnter}
              onChange={handleChange}
              value={notesData.notes}
              className="inputBox"
              type="text"
              placeholder="Enter your text here............"
            />
            {notesData.notes !== "" ? (
              <img
                className="sendBtn"
                onClick={handleClick}
                src={enabledSend}
                alt="sendBtn"
                style={{cursor:'pointer'}}
              />
            ) : (
              <img className="sendBtn" src={diabledSend} alt="sendBtn" />
            )}
          </div>
        </div>
      ) : (
        <div className="notesContainer">
          <div className="heroContainer">
            <img className="bg_image" src={bg_img} alt="bg_image" />
            <div className="heading">Pocket Notes</div>
            <div className="description">
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </div>
          </div>
          <div className="encryptMsg">
            <img src={encrypt_icon} alt="lock_icon" />
            <div>end-to-end encrypted</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mynotes;
