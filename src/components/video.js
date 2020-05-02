import React, { Component } from 'react'
import { Tag } from './tag'
import path from 'path'
import { getTags } from '../plugins/db'

export class Video extends Component {
  render() {
    return (
      <div>
        Title: {this.props.name}<br />
        Tags: {getTags(this.props.name).map((tag) => <Tag name={tag} file={this.props.name} />)}<br />
        <video controls width="300px" src={path.resolve(this.props.name)}></video>
      </div>
    )
  }
}
