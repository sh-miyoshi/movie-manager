import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Video } from './components/video'
import { getFilteredVideoFiles, addOpenFileOrDirectoryList } from './plugins/db'
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
      <div>
        <div>
          <div>headers</div>
          <div>
            <button onClick={this.handleOpenDir}>Open Derectory</button>
          </div>
        </div>
        <div>
          <Select />
        </div>
        <div>
          {
            getFilteredVideoFiles().map((f) => <Video name={f}></Video>)
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))