import React from 'react'
import './NotesCard.css'

const NotesCard = ({notes, date, time}) => {

  return (
    // {
      <div className='NotescardContainer'>
        <div className="input">{notes}</div>
        <div className="timeContainer">
          <div className="date">{date}</div>
          <span className='dot'>&#8226;</span>
          <div className="time">{time}</div>
        </div>
      </div>
    // }
  )
}

export default NotesCard