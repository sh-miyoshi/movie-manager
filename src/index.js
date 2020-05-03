import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './components/video'
import { getFilteredVideoFiles } from './plugins/db'
import { Container, Row } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <Container>
        <Row>TODO(headers)</Row>
        <Row>TODO(selected tags)</Row>
        <Row>
          {
            getFilteredVideoFiles().map((f) => <Video name={f}></Video>)
          }
        </Row>
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))