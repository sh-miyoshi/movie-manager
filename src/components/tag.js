import React, { Component } from 'react'

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
