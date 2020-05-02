import React, { Component } from 'react'
import { removeTag } from '../plugins/db'

export class Tag extends Component {
  render() {
    return (
      <div>
        {this.props.name}
        <button onClick={() => this.props.remover(this.props.name)}>x</button>
      </div>
    )
  }
}
