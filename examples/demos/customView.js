import React from 'react'

import * as dates from 'date-arithmetic'
import events from '../events'
import clsx from 'clsx'
import { Calendar, Views, Navigate } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import DateContentRow from 'react-big-calendar/lib/DateContentRow'
import ExampleControlSlot from '../ExampleControlSlot'
import chunk from 'lodash/chunk'

// import { findDOMNode } from 'react-dom'
// import chunk from 'lodash/chunk'
// import { navigate, views } from './utils/constants'
// import { notify } from './utils/helpers'
// import getPosition from 'dom-helpers/position'
// import * as animationFrame from 'dom-helpers/animationFrame'

// import Popup from './Popup'
// import Overlay from 'react-overlays/Overlay'
// import DateContentRow from './DateContentRow'
// import Header from './Header'
// import DateHeader from './DateHeader'

// import { inRange, sortEvents } from '/utils/eventLevels'

class MyWeek extends React.Component {
  render() {
   // let { date } = this.props
    let range = MyWeek.range(date)

    let { date, localizer, className } = this.props,
    month = dates.visibleDays(date, localizer),
    weeks = chunk(month, 7)

    this._weekCount = weeks.length
    
    return (
    <div className={clsx('rbc-month-view', className)}>
    <div className="rbc-row rbc-month-header">
      {this.renderHeaders(weeks[0])}
    </div>
    {weeks.map(this.renderWeek)}
    {this.props.popup && this.renderOverlay()}
  </div>)
  }

  renderWeek = (week, weekIdx) => {
    let {
      events,
      components,
      selectable,
      getNow,
      selected,
      date,
      localizer,
      longPressThreshold,
      accessors,
      getters,
    } = this.props

    const { needLimitMeasure, rowLimit } = this.state

    events = eventsForWeek(events, week[0], week[week.length - 1], accessors)

    events.sort((a, b) => sortEvents(a, b, accessors))

    return (
      <DateContentRow
        key={weekIdx}
        ref={weekIdx === 0 ? this.slotRowRef : undefined}
        container={this.getContainer}
        className="rbc-month-row"
        getNow={getNow}
        date={date}
        range={week}
        events={events}
        maxRows={rowLimit}
        selected={selected}
        selectable={selectable}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        renderHeader={this.readerDateHeading}
        renderForMeasure={needLimitMeasure}
        onShowMore={this.handleShowMore}
        onSelect={this.handleSelectEvent}
        onDoubleClick={this.handleDoubleClickEvent}
        onKeyPress={this.handleKeyPressEvent}
        onSelectSlot={this.handleSelectSlot}
        longPressThreshold={longPressThreshold}
        rtl={this.props.rtl}
        resizable={this.props.resizable}
      />
    )
  }

  readerDateHeading = ({ date, className, ...props }) => {
    let { date: currentDate, getDrilldownView, localizer } = this.props

    let isOffRange = dates.month(date) !== dates.month(currentDate)
    let isCurrent = dates.eq(date, currentDate, 'day')
    let drilldownView = getDrilldownView(date)
    let label = localizer.format(date, 'dateFormat')
    let DateHeaderComponent = this.props.components.dateHeader || DateHeader

    return (
      <div
        {...props}
        className={clsx(
          className,
          isOffRange && 'rbc-off-range',
          isCurrent && 'rbc-current'
        )}
      >
        <DateHeaderComponent
          label={label}
          date={date}
          drilldownView={drilldownView}
          isOffRange={isOffRange}
          onDrillDown={e => this.handleHeadingClick(date, drilldownView, e)}
        />
      </div>
    )
  }

  renderHeaders(row) {
    let { localizer, components } = this.props
    let first = row[0]
    let last = row[row.length - 1]
    let HeaderComponent = components.header || Header

    return dates.range(first, last, 'day').map((day, idx) => (
      <div key={'header_' + idx} className="rbc-header">
        <HeaderComponent
          date={day}
          localizer={localizer}
          label={localizer.format(day, 'weekdayFormat')}
        />
      </div>
    ))
  }

}

MyWeek.range = date => {
  let start = date
  let end = dates.add(start, 14, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return dates.add(date, -14, 'day')

    case Navigate.NEXT:
      return dates.add(date, 14, 'day')

    default:
      return date
  }
}

MyWeek.title = date => {
  return `My awesome month: ${date.toLocaleDateString()}`
}



let CustomView = ({ localizer }) => (
  <React.Fragment>
    <ExampleControlSlot.Entry waitForOutlet>
      <strong>The Calendar below implments a custom 3-day week view</strong>
    </ExampleControlSlot.Entry>
    <Calendar
      events={events}
      localizer={localizer}
      defaultView={Views.WEEK}
      defaultDate={new Date()}
      views={{ month: MyWeek, week: true }}
    />
  </React.Fragment>
)

export default CustomView
