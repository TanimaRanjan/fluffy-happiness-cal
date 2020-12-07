import React, { useState, useEffect } from 'react'
import Api from './Api'
import Intro from './Intro.md'
import { render } from 'react-dom'
import Layout from 'react-tackle-box/Layout'

import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import 'react-big-calendar/lib/sass/styles.scss'
import './styles.scss'
import './prism.scss'
import Card from './Card'
import Rendering from './demos/rendering'
import CustomView from './demos/customView'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

const globalizeLocalizer = localizer(globalize)

const EXAMPLES = {
  rendering: 'Weeky',
  customView: '3 Day',
}

const DEFAULT_EXAMPLE = 'rendering'

const Example = () => {

  const [selected, setSelected] = useState(DEFAULT_EXAMPLE)
  //  const [current, setCurrent] = useState(Rendering)

  let Current = {
    rendering: Rendering,
    customView: CustomView,
  }[selected]

  console.log('Current 1 ', Current)
  const select = selected => {
    console.log('Calling select ')
    setSelected({ selected })
  }



  useEffect(() => {
    
    const hash = (window.location.hash || '').slice(1)
    console.log('useEffect ', hash, DEFAULT_EXAMPLE, window.location.hash)
    setSelected(hash || DEFAULT_EXAMPLE)
    Current = {
      rendering: Rendering,
      customView: CustomView,
    }[selected]
  }, [selected])
  console.log('Current ', Current)


    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container">
            <h1>
            </h1>
          </div>
        </div>
        <div className="examples">
          <Card className="examples--header">
            <Layout
              align="center"
              justify="space-between"
              style={{ marginBottom: 15 }}
            >
              <Dropdown
                pullRight
                id="examples-dropdown"
                className="examples--dropdown"
              >
                <Dropdown.Toggle bsStyle="link" className="dropdown--toggle ">
                  {EXAMPLES[selected]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(EXAMPLES).map(([key, title]) => (
                    <MenuItem
                      active={selected === key}
                      key={key}
                      href={`#${key}`}
                      onClick={() => select(key)}
                    >
                      {title}
                    </MenuItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Layout>
          </Card>
          <div className="example">
            {Current && <Current localizer={globalizeLocalizer} />}
          </div>
        </div>
        <div className="jumbotron">
          <div className="container">
          </div>
        </div>
      </div>
    )
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Example />, document.getElementById('app'))
})
