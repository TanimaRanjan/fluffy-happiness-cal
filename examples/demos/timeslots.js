import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from '../events'

let Timeslots = ({ localizer }) => (
  <Calendar
    events={events}
    step={30}
    timeslots={1}
    localizer={localizer}
    defaultView={Views.WEEK}
    defaultDate={new Date(2020, 10, 23, 18, 30, 0)}
  />
)

export default Timeslots
