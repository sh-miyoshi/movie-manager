import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        <h1>hello, world</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))