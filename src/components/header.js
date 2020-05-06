import React, { Component } from 'react'
import { remote } from 'electron'
import { addOpenFileOrDirectoryList } from '../plugins/db'
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
      <div>
        <img src="assets/img/logo.png" />
        <button onClick={this.handleOpenDir}>
          <img width="30px" src="assets/img/folder_open.png" />
        </button>
      </div>
    )
  }
}
