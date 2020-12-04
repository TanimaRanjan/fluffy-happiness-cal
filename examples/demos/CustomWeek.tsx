import React, { useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import './calendar.scss'
import 'react-big-calendar/lib/sass/styles.scss'

import i18n from '../../i18n'
import DashboardStyles from './Styles'
import isSameDay from 'date-fns/isSameDay'
import dateFormat from 'date-fns/format'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'

import { createStyles, makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import CallIcon from '@material-ui/icons/Call'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import List from '@material-ui/core/List'


moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1,
  },
})

// const localizer = momentLocalizer(moment)
// const now = new Date()

// Types 
// Events 
export interface Events {
  event: Event[]
}
// Event 
export interface Event {
  id: number
  title: String
  description?: String
  start: Date
  end: Date
  type: String // event_type
 // participants?: Participant[]
 participant?: String
  brand?: String
}
// 
export interface Participant {
 id: number
 name: String
 email?: String
} 

const events  = [
   {
    id: 19,
    title: 'An overlapped Event',
    start: new Date(2020, 10, 25, 9, 0, 0),
    end: new Date(2020, 10, 25, 9, 30, 0),
    type: 'call',
    participant: 'Amy Lee',
    brand: 'TR',
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2020, 10, 25, 10, 0, 0), //new Date(1606325753* 1000),
    end: new Date(2020, 10, 25, 10, 30, 0), //new Date(1606327753* 1000),
    type: 'call',
    participant: 'Lisa Smith',
    brand: 'TI',
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2020, 10, 25, 12, 0, 0),
    end: new Date(2020, 10, 25, 13, 30, 0),
    type: 'google',
  },
  {
    id: 22,
    // allDay: true,
    title: 'Cooking Class',
    start: new Date(2020, 10, 25, 14, 30, 0),
    end: new Date(2020, 10, 25, 16, 0, 0),
    type: 'busy',
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2020, 10, 25, 16, 30, 0),
    end: new Date(2020, 10, 25, 18, 0, 0),
   // class: 'red',
    desc: 'Going to the gym today',
    type: 'draft',
    brand: 'TI', // TopInterview TopREsume etc ?
  },
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
    schedule: {
      display:"flex",
       justifyContent:"center",
       margin:'0.5rem',
    },
    calendar: {
      // display:'flex',
      flex: 1,
      marginTop: '2rem',
    },
    participants: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      marginTop: '4rem',
      paddingLeft: '1rem',
      minWidth: '20rem',
    },
    participant: {
      padding: '1rem',
      borderBottom: '1px solid grey',
    },
    speciaDay: {
      // border: '1px solid black',
    },
    googleEvent: {
      backgroundColor: 'lightblue',
      color: 'black',
      borderRadius: '0px',
      border: 'none',
      margin: 0,
    },
    draftEvent: {
      backgroundColor: 'lightred',
      color: 'black',
      borderRadius: '0px',
      border: 'none',
      margin: 0,
    },
    callEvent: {
      backgroundColor: 'lightgreen',
      color: 'black',
      borderRadius: '0px',
      border: 'none',
      margin: 0,
    },
    busyEvent: {
      backgroundColor: 'lightgrey',
      color: 'black',
      borderRadius: '0px',
      border: 'none',
      margin: 0,
    },
    header: {
      // height: '80px',
      padding: '10px',
      // backgroundColor: '#FFF',
    },
    wrapper: {
      display: 'flex',
      fontSize: '10px',
      padding: '10px',
      border: '1px solid red',
    },

    listItems: {
      color: 'inherit',
      alignItems: 'flex-start',
      padding: '0',
    },
    listItemIcon: {
      listStyleType: 'none',
      minWidth: '2rem',
    },
    listIcon: {
      fontSize: '1.5rem',
      marginRight: '.5rem',
      marginBottom: '.5rem',
    },
    listItem: {
      paddingTop: '0',
      paddingBottom: '0',
    },
    listItemText: {
      marginLeft: '.4rem',
    },
    listHeader: {
      listStyleType: 'none',
      paddingBottom: '0.4rem',
    },
    callInfo : {
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
    },
    callTime: {
      display: 'flex',
      alignItems: 'center',
    },
    callTimeText: {
      fontsize: '.5rem',
      color: 'grey',
    },
    callWith: {
      fontWeight: 'bold',
      marginBottom: '.2rem',
    },
    callIn: {
      fontsize: '.5rem',
      color: 'grey',
    },
  })
)

const CalendarContainer: React.FC = () => {
  const classes = useStyles()
  const localizer = momentLocalizer(moment)
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const MyCustomHeader = (label: any) => {
    return (
      <Box className={classes.header}>
        <div>{label.localizer.format(label.date, 'ddd')}</div>
        <div>{label.localizer.format(label.date, '(MM/DD)')}</div>
      </Box>
    )
  }

  const customDayPropGetter = (date: Date) => {
    // Check if the date is selected date and mark it. 
    if (isSameDay(date, selectedDate))
      return {
        //className: 'special-day',
        style: {
        // border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
        backgroundColor:'#DDD'//'#f7f7f7'
        },
      }
    else return {}
  }

  const customSlotPropGetter = (date: Date) => {
    // if (date.getDate() === 24 || date.getDate() === 15)
    //   return {
    //     className: classes.speciaDay,
    //     backgroundColor:'grey'
    //   }
    //else 
    return {}
  }

  const MyCustomEvent = (props: any) => (
    // <Box className={classes.googleEvent}>
    <Box>
      <Typography>{props.title}</Typography>
    </Box>
  )

  const ColoredTimeCellWrapper = (props: any) => {
    // console.log(props)//
    return (
      <Box>
        <Typography>{props.children}</Typography>
      </Box>
    )
  }

  const ColoredTimeGutterWrapper = (props: any) => {
    // console.log(props)//
    return (
      <Box className={classes.wrapper}>
        <Typography>{props.children}</Typography>
      </Box>
    )
  }

  // const ColoredDateCellWrapper = (props: any) => {
  //   console.log(props)
  //   return ( <div className={classes.wrapper}>
  //     {props.children}
  //   </div>)
  // }

  //    const ColoredDateCellWrapper = (props: any)  => {
  //   console.log(props)
  //   return ( <Box>
  //     <Typography>wrapper</Typography>
  //   </Box>)
  // }

  const customEventPropGetter = (props: any) => {
    // console.log(props)
    if (props.type === 'draft') return { className: classes.draftEvent }
    if (props.type === 'google') return { className: classes.googleEvent }
    if (props.type === 'call') return { className: classes.callEvent }
    if (props.type === 'busy') return { className: classes.busyEvent }

    return {
      className: classes.googleEvent,
    }
  }

  const MyCustomTimeGutterHeader = (props: any) => {
    // console.log(props)
    return (
      <Box>
        <Typography>All Day</Typography>
      </Box>
    )
  }

  const onNavigate = (date: any, view: any) => {
    console.log('#### onNavigate')
    console.log('#### date=', date)
    console.log('#### view=', view)
    //const new_date = moment(date)
    setSelectedDate(date)
    
  }

  // const MyCustomEventContainerWrapper = (props: any) => {
  //   // console.log('MyCustomEventWrapper ', props.children)
  //   return (

  //       <Box className={classes.wrapper}>
  //         Where is it. Edit
  //         {props.children}
  //       </Box>
  //   )

  // }
  const MyCustomEventWrapper = (props: any) => {
    // console.log('MyCustomEventWrapper ', props.children)
    return <Box>{props.children}</Box>
    //     React.cloneElement(React.Children.only(children), {
    //         style: {
    //             ...children.style,
    //             backgroundColor: value < new Date() ? 'lightgreen' : 'lightblue',
    //         },

    // style?: React.CSSProperties & { xOffset: number };
    // className: string;
    // event: TEvent;
    // isRtl: boolean;
    // getters: {
    //     eventProp?: EventPropGetter<TEvent>;
    //     slotProp?: SlotPropGetter;
    //     dayProp?: DayPropGetter;
    // };
    // onClick: (e: React.MouseEvent<HTMLElement>) => void;
    // onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void;
    // accessors: {
    //     title?: (event: TEvent) => string;
    //     tooltip?: (event: TEvent) => string;
    //     end?: (event: TEvent) => Date;
    //     start?: (event: TEvent) => Date;
    // };
    // selected: boolean;
    // label: string;
    // continuesEarlier: boolean;
    // continuesLater: boolean;
  }
  // console.log(addHours(endOfDay(new Date(2020, 12, 30)), -1))

  // const CustomToolbar = (toolbar: any) => {
  // toolbarDate = toolbar.date;
  // const goToDayView = () => {
  // toolbar.onViewChange('day');
  // }
  // const goToWeekView = () => {
  // toolbar.onViewChange('week');
  // }
  // const goToMonthView = () => {
  // toolbar.onViewChange('month');

  // setTimeout(() => {
  //   this.setOffRangeDateStyle();
  // }, 100)
  //
  // }
  // const goToBack = () => {
  //   let mDate = toolbar.date;
  //   let newDate = new Date(
  //     mDate.getFullYear(),
  //     mDate.getMonth() - 1,
  //     1);
  //   toolbar.onNavigate('prev', newDate);
  //   this.getCalendarEvents(newDate);

  // }
  // const goToNext = () => {
  //   let mDate = toolbar.date;
  //   let newDate = new Date(
  //     mDate.getFullYear(),
  //     mDate.getMonth() + 1,
  //     1);
  //   toolbar.onNavigate('next', newDate);
  //   this.getCalendarEvents(newDate);

  // }
  // return (
  //   <div className="toolbar-container">
  //     <div className="navigation-buttons">
  //       <button className="btn btn-back" >
  //         {/* <BackIcon className='prev-icon' /> */}ICON
  //       </button>
  //       <button className="btn btn-next">
  //         {/* <NextIcon className='next-icon' /> */}ICON
  //       </button>
  //       <label className='label-date'>Label DAte</label>
  //     </div>
  {
    /* <div className="filter-container">
          <button className="bg-filter-off" onClick={goToDayView}><span className="label-filter-off">Day</span></button>
          <button className="bg-filter-off" onClick={goToWeekView}><span className="label-filter-off">Week</span></button>
          <button className="bg-filter-off" onClick={goToMonthView}><span className="label-filter-off">Month</span></button>
        </div> */
  }
  //   </div >
  // )
  // }

  const handleSelectSlot = (props:any) => {
    console.log("Selected", props);
    return false
    
   // writeToLocalStorageHere(start);
}

  return (
    <Box className={classes.schedule}>
      <Box className={classes.calendar}>
        <Calendar
        //selectable={false}
        
        selectable="ignoreEvents"
          step={60}
          timeslots={1}
          localizer={localizer}
          events={events}
          defaultDate={today}
          defaultView={'week'}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          min={new Date(2020, 10, 0, 9, 0, 0)}
          scrollToTime={new Date(1970, 1, 1, 6)}
          max={new Date(2020, 10, 0, 18, 0, 0)}
          views={{ week: true }}
          dayPropGetter={customDayPropGetter}
          slotPropGetter={customSlotPropGetter}
          eventPropGetter={customEventPropGetter}
          onNavigate={onNavigate}
          formats={{ timeGutterFormat: (date, localizer) => dateFormat(date, 'H') }}
         // onSelectSlot={handleSelectSlot}
        //  onView={handleSelectSlot}
          onSelectEvent={handleSelectSlot}
          // formats={{dateFormat: 'ddd MMM DD', weekdayFormat: 'dddd'}}
          components={{
            event: MyCustomEvent,
            //  timeGutterHeader: MyCustomTimeGutterHeader,
            //         event?: React.ComponentType<EventProps<TEvent>>;
            //eventWrapper: MyCustomEventWrapper, // React.ComponentType<EventWrapperProps<TEvent>>;
            //  eventContainerWrapper: MyCustomEventContainerWrapper,
            // dateCellWrapper?: React.ComponentType;
            // timeSlotWrapper?: React.ComponentType;
            // timeGutterHeader?: React.ComponentType;
            // timeGutterWrapper?: React.ComponentType;
            // toolbar: CustomToolbar,
            // week: {

            //   header: MyCustomHeader,
            //   event: MyCustomEvent,
            // },
            // work_week: {
            //   header:MyCustomHeader,
            //   event: MyCustomEvent,
            // },
            //  timeSlotWrapper: ColoredTimeCellWrapper,
            //dateCellWrapper: ColoredDateCellWrapper,
            // timeGutterWrapper: ColoredTimeGutterWrapper,
            header: MyCustomHeader,
          }}
          // formats={{
          //   timeGutterFormat: (date,localizer) =>
          //   localizer.format(date, 'HH:mm'),
          // }}
          //   max={addHours(endOfDay(new Date(2020, 12, 30)), -2)}
        />
      </Box>
      <Box display="flex" justifyContent="flex-start" flexDirection="column" className={classes.participants}>
      <Select
              //  input={<BootstrapInput id="m_strategy_name" />}
                value={'weekly'}
               
              >
                {/* {snippetTypes.map(snippetType => ( */}
                  <MenuItem value={'weekly'} key={`strategy-name-${'weekly'}`}>
                    {/* {snippetType} */}Weekly
                  </MenuItem>
                {/* ))} */}
              </Select>
        <List className={classes.listItems}>
          {events
            .filter(event => {
              return (
                (event.type === 'call') && isSameDay(event.start , selectedDate)
              )})
            .map(event => {
              console.log(differenceInHours(new Date(), event.start))
              console.log(differenceInMinutes(new Date(), event.start))
              console.log(dateFormat(event.start, 'hh:mm a'), dateFormat(event.end, 'hh:mm a'))
              return (
                <Box key={event.id} className={classes.participant}>
                  <Box className={classes.callInfo}>
                  <Box>
                    <Box className={classes.callTime}>
                      <AccountBoxIcon className={classes.listIcon} />
                      <Typography className={classes.callTimeText}>
                        {dateFormat(event.start, 'hh:mm a')} - {dateFormat(event.end, 'hh:mm a')}
                      </Typography>
                    </Box>
                    <Typography variant={'body2'} className={classes.callWith}>
                      {event.participant}
                    </Typography>
                    <Typography variant={'body2'} className={classes.callIn}>
                      call in {differenceInHours(new Date(), event.start)} hr
                    </Typography>
                    </Box>
                    <Box>
                      <CallIcon className={classes.listIcon} />
                    </Box>
                  </Box>
                </Box>
              )
            })}
        </List>
      </Box>
    </Box>
  )
}

export default CalendarContainer
