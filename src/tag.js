import React, { Component } from 'react'

export class Tag extends Component {
  render() {
    return (
      <div>
        {this.props.name}
        <button>x</button>
      </div>
    )
  }
}
