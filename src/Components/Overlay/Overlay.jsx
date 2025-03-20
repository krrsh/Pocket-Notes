import React, { useState } from "react";
import "./Overlay.css";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, setPlusBtn } from "../../Redux/NoteSlice";

const Overlay = () => {

  const groups = useSelector((state)=>state.notedata.groups)

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];


  const dispatch = useDispatch();

  const [error, setError] = useState({
    gtTwoString : null,
    duplicate : null
  });

  //colorselecting
  const [selectedColor, setSelectedColor] = useState("#B38BFA");

  const handleColorclick = (e) => {
    const color = e.target.getAttribute("data-color");
    setSelectedColor(color);
  };

  //getting the name and initials of the group
  const [groupName, setGroupName] = useState("");

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };



  const getInitial = () => {
    console.log('Group name inside getInitials : ',groupName)

    const name = groupName.trim().split(" ");
    let initial_value = "";

    if (name.length === 1) {
      initial_value = name[0][0];
    }
     else if (name.length === 2) {
      initial_value = name[0][0] + name[1][0];
    }
    console.log('Initial value inside setInital', initial_value.toUpperCase())
    return initial_value.toUpperCase();
  };



  const handleCreate = (e) => {

    e.preventDefault()

    ///checking for empty or more than 2 strings
    const trimname = groupName.trim();
    let newError = { gtTwoString : null, duplicate : null}
    if (trimname === "" || trimname.split(" ").length > 2) {
      newError.gtTwoString = true;
    }

    //checking for duplicate groups
    const duplicateName = groups.some((item)=>item.name.trim().toLowerCase() === trimname.toLowerCase())
      if(duplicateName){
        newError.duplicate = true
      }

      if(newError.gtTwoString || newError.duplicate){
        setError(newError);
        return;
      }
    
    //Valid input
      console.log("Validation starts..");
      const initial_value = getInitial();
      const newGroup = {
        name : groupName,
        initials : initial_value,
        color : selectedColor,
        id : crypto.randomUUID(),
      }
      dispatch(setGroups(newGroup))

      //updating to localstorage
      const updatedGroups = [...groups, newGroup]
      localStorage.setItem('groups', JSON.stringify(updatedGroups))


      dispatch(setPlusBtn(false));
      setGroupName('');
      setSelectedColor('#B38BFA');
      setError({
        gtTwoString : null,
        duplicate : null,
      })
  };

  
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(setPlusBtn(false));
    }
  };

  return (
    <div onClick={handleClose} className="overlayContainer">
      <div className="createGroupPopup">
        <div style={{ fontWeight: "500" }}>Create New Group</div>
        <div className="nameInputSection">
          <div style={{ fontWeight: "500", width: "100px", marginRight:'20px' }}>Group Name</div>
          <div className="input_warningsSection">
          <input
            type="text"
            onChange={handleChange}
            value={groupName}
            placeholder="Enter group name"
          />
          {error.gtTwoString &&  <span className="input_warning">* Group name must contain one or two words!</span>}
          {error.duplicate &&  <span className="input_warning">* Group already exists!</span>}
          </div>
        </div>
        <div className="colorSection">
          <div style={{ fontWeight: "500", width: "100px", marginRight:'20px' }}>Choose Color</div>
          <div className="colorContainer">
            <div className='colors'>
            {colors.map((item, index) => {
              return (
                  <div
                  key={index}
                    onClick={handleColorclick}
                    data-color={item}
                    style={{
                      backgroundColor: item,
                      outlineOffset: "1px",
                      outline:
                        selectedColor === item
                          ? "3px solid rgb(174, 177, 187)"
                          : "none",
                    }}
                    className="color"
                  ></div>
                );
              })}
              </div>
          </div>
        </div>
        <button onClick={handleCreate} className="createBtn">
          Create
        </button>
      </div>
    </div>
  );
};

export default Overlay;
Overlay;
