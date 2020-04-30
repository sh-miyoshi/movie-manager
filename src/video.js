import React, { Component } from 'react'
import { Tag } from './tag'

export class Video extends Component {
  render() {
    return (
      <div>
        Title: {this.props.name}<br />
        Tags: <Tag name="sample" /><br />
        <video controls width="300px" src=""></video>
      </div>
    )
  }
}
