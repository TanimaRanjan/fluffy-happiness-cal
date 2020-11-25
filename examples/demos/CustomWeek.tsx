import React, { useState } from 'react'
import 'react-big-calendar/lib/sass/styles.scss'
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import i18n from '../../i18n'
import DashboardStyles from './Styles'
import endOfDay from 'date-fns/endOfDay'
import addHours from 'date-fns/addHours'
import './calendar.scss'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Typography } from '@material-ui/core'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import YesNoDialog from '../AutoLinkedin/YesNoDialog'
// import SearchModal, { View } from './SearchModal'
import IconButton from '@material-ui/core/IconButton'
// import { Context } from 'immutability-helper'
// import * as dates from './calendarDate'

moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1,
  },
})

const localizer = momentLocalizer(moment)
const now = new Date()

const events = [
  // {
  //   id: 14,
  //   title: 'Today',
  //   start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //   end: new Date(new Date().setHours(new Date().getHours() + 3)),
  // },
  {
    id: 19,
    title: 'An overlapped Event',
    start: new Date(2020, 10, 25, 9, 0, 0),
    end: new Date(2020, 10, 25, 9, 30, 0),
    type: 'call',
    participant:'Amy Lee',
    brand:'TR',
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2020, 10, 25, 10, 0, 0),//new Date(1606325753* 1000),
    end: new Date(2020, 10, 25, 10, 30, 0),//new Date(1606327753* 1000),
    type: 'call',
    participant:'Lisa Smith',
    brand:'TI',
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
    class: 'red',
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
    calendar: {
      // display:'flex',
      flex: 1,
      marginTop:'2rem',
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
      display:'flex',
      fontSize:'10px',
      padding:'10px',
     border:'1px solid red'
    }
  })
)

const CalendarContainer: React.FC = () => {
  const classes = useStyles()
  const localizer = momentLocalizer(moment)
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())

  const MyCustomHeader = (label: any) => {
    return (
      <Box className={classes.header}>
        <div>{label.localizer.format(label.date, 'ddd')}</div>
        <div>{label.localizer.format(label.date, '(MM/DD)')}</div>
      </Box>
    )
  }

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
        className: classes.speciaDay,
      }
    else return {}
  }

  const MyCustomEvent = (props: any) => (
    // <Box className={classes.googleEvent}>
    <Box>
      <Typography>{props.title}</Typography>
    </Box>
  )

  const ColoredTimeCellWrapper = (props: any) => {
    // console.log(props)//
    return ( <Box >
      <Typography>{props.children}</Typography>
    </Box>)
  }

  const ColoredTimeGutterWrapper = (props: any) => {
    // console.log(props)//
    return ( <Box className={classes.wrapper}>
      <Typography>{props.children}</Typography>
    </Box>)
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
    <Box >
      <Typography>All Day</Typography>
    </Box>
  )}

  const onNavigate = (date: any, view: any) => {
    console.log('#### onNavigate')
    console.log('#### date=', date)
    console.log('#### view=', view)
    const new_date = moment(date)
    // this.setState({
    //   current_date: new_date
    // });

    //this.updateTimes(new_date, view);
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
    return (
      
        <Box>
          {props.children}
        </Box>
    )
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
        {/* <div className="filter-container">
          <button className="bg-filter-off" onClick={goToDayView}><span className="label-filter-off">Day</span></button>
          <button className="bg-filter-off" onClick={goToWeekView}><span className="label-filter-off">Week</span></button>
          <button className="bg-filter-off" onClick={goToMonthView}><span className="label-filter-off">Month</span></button>
        </div> */}
    //   </div >
    // )
    // }


  return (
    <Box display="flex" justifyContent="center" >
      <Box className={classes.calendar}>
        <Calendar
        
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
          // formats={{ eventTimeRangeFormat: () => null }}
          // formats={{dateFormat: 'ddd MMM DD', weekdayFormat: 'dddd'}}
          components={{
             event: MyCustomEvent,
           timeGutterHeader: MyCustomTimeGutterHeader,
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
             timeSlotWrapper: ColoredTimeCellWrapper,
              //dateCellWrapper: ColoredDateCellWrapper,
              timeGutterWrapper: ColoredTimeGutterWrapper,
            header: MyCustomHeader,
            
          }}
          //   max={addHours(endOfDay(new Date(2020, 12, 30)), -2)}
        />
      </Box>
      <Box display="flex">

          <GridList>

          </GridList>
        
        
      </Box>
    </Box>
  )
}

export default CalendarContainer
