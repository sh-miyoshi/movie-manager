import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './components/video'
import { getVideoFiles } from './plugins/db'

class App extends Component {
  render() {
    return (
      <div>
        {
          getVideoFiles().map((f) => <Video name={f}></Video>)
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))