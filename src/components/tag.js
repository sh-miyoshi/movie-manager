import React, { Component } from 'react'
import './tag.css'

export class Tag extends Component {
  render() {
    return (
      <div className="tag">
        {this.props.name}
        <button className="btn" onClick={() => this.props.remover(this.props.name)}>x</button>
      </div>
    )
  }
}
