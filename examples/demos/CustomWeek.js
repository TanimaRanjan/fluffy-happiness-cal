import React from 'react'
import 'react-big-calendar/lib/sass/styles.scss'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import i18n from '../../i18n'
import DashboardStyles from './Styles'
import endOfDay from 'date-fns/endOfDay'
import addHours from 'date-fns/addHours'
// import '../../styles/'
import './calendar.scss'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment'
import { Typography } from '@material-ui/core'
import { Context } from 'immutability-helper'
// import * as dates from './calendarDate'

const localizer = momentLocalizer(moment)
const now = new Date()

const events = [
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  // {
  //   id: 20,
  //   title: 'An overlapped Event',
  //   start: new Date(2020, 10,24, 17, 0, 0),
  //   end: new Date(2020, 10,24, 18, 30, 0),
  //   type:'call'
  // },
  // {
  //   id: 21,
  //   title: 'Phone Interview',
  //   start: new Date(2020, 10,24, 17, 0, 0),
  //   end: new Date(2020, 10,24, 18, 30, 0),
  //   type:'google'

  // },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2020, 10,14, 17, 30, 0),
    end: new Date(2020, 10,14, 19, 0, 0),
    type:'busy'
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2020, 10, 22, 18, 30, 0),
    end: new Date(2020, 10, 22, 20, 0, 0),
    class:'red',
    desc:'Going to the gym today',
    type:'draft',
    brand:'TI' // TopInterview TopREsume etc ? 

  }
]


const useStyles = makeStyles(theme =>
    createStyles({
      container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: DashboardStyles.fullWidth,
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2.4375rem 3.75rem',
        '@media (max-width: 1050px)': {
          padding: '2rem 2rem',
        },
      },
      tabs: {
        display: 'flex',
        background: '#fff',
        borderBottom: '1px solid #D5D9E0',
        padding: '0.15rem .5rem 0',
      },
      tabLabel: {
        fontSize: '.9rem',
        textTransform: 'uppercase',
      },
      calendar: {
        // display:'flex',
        flex:1
      }, 
      speciaDay: {
        border:'3px dashed pink'
      },
      googleEvent: {
        backgroundColor: "lightblue",
        color: 'black',
        borderRadius: "0px",
        border: "none"
      }
    })
  )



const CalendarContainer: React.FC = () => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const localizer = momentLocalizer(moment)
    const today = new Date()

    //const startDate = start_date ? dateFormat(addDays(new Date(start_date), 1), 'MM/yyyy') : ''
    //const endDate = end_date ? dateFormat(addDays(new Date(end_date), 1), 'MM/yyyy') : ''


    const customDayPropGetter = (date: Date) => {
      if (date.getDate() === 7 || date.getDate() === 15)
        return {
          className: 'special-day',
          style: {
            border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
          },
        }
      else return {}
    }
    
const customSlotPropGetter = (date: Date) => {
  if (date.getDate() === 24 || date.getDate() === 15)
    return {
      className: classes.speciaDay
    }
  else return {}
}

const MyCustomEvent = () => (
  // <Box className={classes.googleEvent}>
    <Box>
    Can add custom event
    <div>--Testing Google Event--</div>
    
  </Box>
)
const Event = () => {
  return (
    <span>
      <strong>Test Title</strong>
      <p>Test Desc'</p>
    </span>
  )
}



const ColoredTimeCellWrapper = () => {
  // let newStyle = {
  //   backgroundColor: "lightgrey",
  //   color: 'black',
  //   borderRadius: "0px",
  //   border: "none",
  //   // backgroundColor :"lightgreen"
  //   }
    return {
      className: classes.googleEvent,
      // style: newStyle
    };
  }

//   const ColoredDateCellWrapper = ({children, value}) =>
//     React.cloneElement(React.Children.only(children), {
//         style: {
//             ...children.style,
//             backgroundColor: value < new Date() ? 'lightgreen' : 'lightblue',
//         },
//     });

const customEventPropGetter = () => {
  // let newStyle = {
  //   backgroundColor: "lightgreen",
  //   color: 'black',
  //   borderRadius: "0px",
  //   border: "none"
  // };
  // if (event){
  //   newStyle.backgroundColor = "lightgreen"
  // }
  return {
    className: classes.googleEvent,
    // style: newStyle
  };
}

    console.log(addHours(endOfDay(new Date(2020, 12, 30)), -1))
    return (
        <Box display="flex" justifyContent="center"> 
          <Box className={classes.calendar}>
          <Calendar
            step={120}
            timeslots={1}
            localizer={localizer}
            events={events}
            defaultDate={today}
            defaultView={'week'}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            min={new Date(2020, 10, 0, 9, 0, 0)}
            scrollToTime={new Date(1970, 1, 1, 6)}
            max={new Date(2020, 10, 0, 22, 0, 0)}
            views={{ week: true }}
            dayPropGetter={customDayPropGetter}
            slotPropGetter={customSlotPropGetter}
            eventPropGetter={customEventPropGetter}
           // formats={{ eventTimeRangeFormat: () => null }}
            components={{
            //  event: Event,
        
              week: { 
                event: MyCustomEvent },
              // timeSlotWrapper: ColoredTimeCellWrapper,
              // dateCellWrapper: ColoredDateCellWrapper,
              
            }}
         //   max={addHours(endOfDay(new Date(2020, 12, 30)), -2)}
      /></Box>
            <Box>
              <Typography>Phone call schedule</Typography>
            </Box>
            </Box>
            )
}


export default CalendarContainer
  

 {/* // weekends={this.state.weekendsVisible}
            // initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
            // select={this.handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            // eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            // you can update a remote database when these fire:
            // eventAdd={function(){}}
            // eventChange={function(){}}
            // eventRemove={function(){}} */}
