import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './components/video'
import { getFilteredVideoFiles, addOpenFileOrDirectoryList } from './plugins/db'
import { Container, Row, Col } from 'react-bootstrap'
import { remote } from 'electron'
import { Select } from './components/select'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reload: false
    }

    this.handleOpenDir = this.handleOpenDir.bind(this);
  }

  handleOpenDir() {
    const res = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })
    if (res) {
      addOpenFileOrDirectoryList(res)

      // refresh component
      this.setState(
        { reload: true },
        () => this.setState({ reload: false })
      )
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>headers</Col>
          <Col>
            <button onClick={this.handleOpenDir}>Open Derectory</button>
          </Col>
        </Row>
        <Row>
          <Select />
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