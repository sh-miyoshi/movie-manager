import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './video'

class App extends Component {
  render() {
    return (
      <div>
        <Video name="test"></Video>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))