import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './components/video'
import { getFilteredVideoFiles } from './plugins/db'
import { Select } from './components/select'
import { Container, Row } from 'react-bootstrap'
import { Header } from './components/header'

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Select />
        <Row>
          Movies:
        </Row>
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