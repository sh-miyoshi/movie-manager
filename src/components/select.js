import React, { Component } from 'react'
import { getSelectTags, setSelectTags } from '../plugins/db'
import { Tag } from './tag'

export class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: '',
      tags: getSelectTags()
    }
    this.remover = this.remover.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(e) {
    this.setState({ tag: e.target.value });
  }

  addTag() {
    if (this.state.tag !== '') {
      this.state.tags.push(this.state.tag)
      setSelectTags(this.state.tags)
      this.setState({ tag: '' })

      // update video list
      window.location.reload()
    }
  }

  render() {
    return (
      <div>
        Filter Tags: {this.state.tags.map((tag) => <Tag name={tag} remover={this.remover} />)}
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="new filter tag name" value={this.state.tag} onChange={this.handleChange} />
          <div className="input-group-append">
            <button className="btn btn-primary btn-sm" onClick={() => this.addTag()}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}
