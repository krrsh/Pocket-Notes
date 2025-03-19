import React, { useEffect } from "react";
import "./Homepage.css";
import Groups from "../../Components/Groups/Groups";
import Mynotes from "../../Components/Mynotes/Mynotes";
import Overlay from "../../Components/Overlay/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile, setShowNotes } from "../../Redux/NoteSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const plusBtn = useSelector((state) => state.notedata.plusBtn);
  const showNotes = useSelector((state) => state.notedata.showNotes);
  const isMobile = useSelector((state) => state.notedata.isMobile);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 600));
      if (window.innerWidth >= 600) {
        dispatch(setShowNotes(false));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="homeContainer">
      {!isMobile && <Groups />}
      {isMobile && !showNotes && <Groups/>}
      {isMobile && showNotes && <Mynotes/>}
      {!isMobile && <Mynotes />}
      {plusBtn && <Overlay />}
    </div>
  );
};

export default Homepage;
