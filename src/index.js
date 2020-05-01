import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './components/video'

class App extends Component {
  render() {
    return (
      <div>
        <Video name="tmp/test.mp4"></Video>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))