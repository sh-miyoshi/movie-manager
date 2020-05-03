import React, { Component } from 'react'
import { Tag } from './tag'
import path from 'path'
import { getTags, removeTag } from '../plugins/db'

export class Video extends Component {
  constructor(props) {
    super(props)
    this.state = { reload: false }
    this.remover = this.remover.bind(this)
  }

  remover(tag) {
    console.log('remove tag: %s', tag)
    removeTag(this.props.name, tag)

    // refresh component
    this.setState(
      { reload: true },
      () => this.setState({ reload: false })
    )
  }

  getFileName(name) {
    const val = name.split('/')
    if (val.length >= 1) {
      return val[val.length - 1]
    }
    return name
  }

  render() {
    return (
      <div>
        Title: {this.getFileName(this.props.name)}<br />
        Tags: {getTags(this.props.name).map((tag) => <Tag name={tag} remover={this.remover} />)}<br />
        <video controls width="300px" src={path.resolve(this.props.name)}></video>
      </div>
    )
  }
}
