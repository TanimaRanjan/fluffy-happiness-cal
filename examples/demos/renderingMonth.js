import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from '../events'
import * as dates from '../../src/utils/dates'

function Event({ event }) {
  return (
  
    <span className={event.class}>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}

const customDayPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
      },
    }
  else return {}
}

const customSlotPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
    }
  else return {}
}

let MyCustomHeader = ({ label }) => (
  <div>
    CUSTOM HEADER:
    <div>{label}</div>
    <MyOtherNestedComponent />
  </div>
)


let MyCustomEvent = ({ label }) => (
  <div>
    Can add custom event
    <div>--{label}--</div>
    <MyOtherNestedComponent />
  </div>
)

const ColoredTimeCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

  const ColoredDateCellWrapper = ({children, value}) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            ...children.style,
            backgroundColor: value < new Date() ? 'lightgreen' : 'lightblue',
        },
    });

let MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>
let today = new Date() 
let Rendering = ({ localizer }) => (
  <Calendar
  // messages={{next: "Następny", previous: "Poprzedni", today: "Dzisiaj", month: "Miesiąc", week: "Tydzień"}}
    events={events}
    step={60}
    timeslots={1}
    localizer={localizer}
    defaultDate={today}
    defaultView={Views.WEEK}
    min={new Date(2020, 10, 0, 7, 0, 0)}
    scrollToTime={new Date(1970, 1, 1, 6)}
    max={dates.add(dates.endOf(new Date(2020, 12, 30), 'day'), -1, 'hours')}
    dayPropGetter={customDayPropGetter}
    slotPropGetter={customSlotPropGetter}
    components={{
      event: Event,
      agenda: {
        event: EventAgenda,
      
      },
      day: { header: MyCustomHeader,
      event: MyCustomEvent },
      week: { header: MyCustomHeader },
      month: { header: MyCustomHeader },
      timeSlotWrapper: ColoredTimeCellWrapper,
      dateCellWrapper: ColoredDateCellWrapper,
    }}
    style={{ height: 200 }}
    // formats={{dateFormat: 'D', weekdayFormat: 'dddd'}}
  />

  // <Calendar
  //     events={events}
  //     defaultView={Views.AGENDA}
  //     formats={{
  //       weekdayFormat: 'dddd',
  //       dayFormat: 'DD dddd',
  //     }}
  //     localizer={localizer}
  //     timeslots={2} // controls the step of timeslots in week view
  //     min={getExactTime(8)} // controls the timeslot start in week view
  //     max={getExactTime(23)} // controls the timeslot end in week view
  //     // components={{
  //     //   toolbar: ToolBar,
  //     //   week: MyCustomWeekView
  //     // }}
  //   />

  // events={this.getBookings()}
  //     defaultDate={calendarDate.toDate()}
  //     date={calendarDate.toDate()}
  //     onNavigate={() => {}}
  //     view={this.props.calendarType || CalendarTypes.DAY}
  //     onView={()=> {}}
  //     toolbar={false}
  //     selectable={true}
  //     popup={true}
  //     scrollToTime={initTime}
  //     formats={{dateFormat: 'D', weekdayFormat: 'dddd'}}
)

export default Rendering
