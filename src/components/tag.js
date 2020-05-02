import React, { Component } from 'react'
import { removeTag } from '../plugins/db'

export class Tag extends Component {
  remove() {
    console.log('remove tag: %s', this.props.name)
    removeTag(this.props.file, this.props.name)
    window.location.reload()
  }

  render() {
    return (
      <div>
        {this.props.name}
        <button onClick={() => this.remove()}>x</button>
      </div>
    )
  }
}
