// import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

import dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'




class MyMonth extends React.Component {
  render() {
    let { date, localizer, className } = this.props,
    month = dates.visibleDays(date, localizer),
    weeks = chunk(month, 7)

  this._weekCount = weeks.length

  return (
    <div className={clsx('rbc-month-view', className)}>
      {/* <div className="rbc-row rbc-month-header"> */}
        {/* {this.renderHeaders(weeks[0])} */}
      {/* </div> */}
      {/* {weeks.map(this.renderWeek)} */}
      {this.props.popup && this.renderOverlay()}
    </div>
  )
  }
}

// Day.propTypes = {
//   date: PropTypes.instanceOf(Date).isRequired,
// }

// MyMonth.range = date => {
//   return [dates.startOf(date, 'year')]
// }

MyMonth.range = (date, { localizer }) => {
    let start = dates.firstVisibleDay(date, localizer)
    let end = dates.add(start, 14, 'day')
    return { start, end }
}

MyMonth.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -14, 'day')

    case navigate.NEXT:
      return dates.add(date, 14, 'day')

    default:
      return date
  }
}

MyMonth.title = (date, { localizer }) => localizer.format(date, 'yearHeaderFormat')

export default MyMonth
