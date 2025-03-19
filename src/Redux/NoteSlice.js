import { createSlice } from '@reduxjs/toolkit'

const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];

const noteSlice = createSlice({
  name: 'notedata',
  initialState: { plusBtn:false , groups:storedGroups, selectedGroup:{}, showNotes: false, isMobile: window.innerWidth < 600 },
  reducers: {
    setGroups:((state, action)=>{
        state.groups = [...state.groups, action.payload]
    }),
    setPlusBtn:((state, action)=>{
        state.plusBtn = action.payload
    }),
    setSelectedGroup:((state, action)=>{
      state.selectedGroup = action.payload
    }),
    setShowNotes:((state, action)=>{
      state.showNotes  =  action.payload
    }),
    setIsMobile:((state, action)=>{
      state.showNotes  =  action.payload
    })
  },
})

export const { setGroups, setPlusBtn, setSelectedGroup, setShowNotes, setIsMobile } = noteSlice.actions
export default noteSlice.reducer