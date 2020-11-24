import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'
import _ from 'lodash'

const propTypes = {}

class CreateEventWithNoOverlap extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      events: _.cloneDeep(events),
      dayLayoutAlgorithm: 'no-overlap',
    }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    const { localizer } = this.props
    return (
      <>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          dayLayoutAlgorithm={'no-overlap'}
        />
        <div>Hello</div>
      </>
      
    )
  }
}

CreateEventWithNoOverlap.propTypes = propTypes

export default CreateEventWithNoOverlap
