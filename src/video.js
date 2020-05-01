import React, { Component } from 'react'
import { Tag } from './tag'
import path from 'path'

export class Video extends Component {
  render() {
    return (
      <div>
        Title: {this.props.name}<br />
        Tags: <Tag name="sample" /><br />
        <video controls width="300px" src={path.resolve(this.props.name)}></video>
      </div>
    )
  }
}
