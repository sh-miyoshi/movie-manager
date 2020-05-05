import React, { Component } from 'react'
import { getSelectTags, setSelectTags } from '../plugins/db'
import { Tag } from './tag'

export class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: getSelectTags()
    }
    this.remover = this.remover.bind(this)
  }

  remover(tag) {
    console.log('remove tag %s from selects', tag)
    const newTags = this.state.tags.filter(t => t !== tag)
    this.setState({
      tags: newTags
    })
    setSelectTags(newTags)

    // update video list
    window.location.reload()
  }

  // add

  render() {
    return (
      <div>
        {this.state.tags.map((tag) => <Tag name={tag} remover={this.remover} />)}
      </div>
    )
  }
}
