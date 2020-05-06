import React, { Component } from 'react'
import { remote } from 'electron'
import { addOpenFileOrDirectoryList } from '../plugins/db'
import { Row, Col } from 'react-bootstrap'
import './header.css'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.handleOpenDir = this.handleOpenDir.bind(this);
  }

  handleOpenDir() {
    const res = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })
    if (res) {
      addOpenFileOrDirectoryList(res)
      window.location.reload()
    }
  }

  render() {
    return (
      <Row>
        <Col>
          <img src="assets/img/logo.png" />
        </Col>
        <Col className="text-right">
          <button onClick={this.handleOpenDir}>
            <img width="30px" src="assets/img/folder_open.png" />
          </button>
        </Col>
      </Row>
    )
  }
}
