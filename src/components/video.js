import React, { Component } from 'react'
import { Tag } from './tag'
import path from 'path'
import { getTags, removeTag, addTag } from '../plugins/db'
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'

export class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reload: false,
      tag: '',
    }
    this.remover = this.remover.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    const val = name.split(/[\/\\]/)
    if (val.length >= 1) {
      return val[val.length - 1]
    }
    return name
  }

  handleChange(e) {
    this.setState({ tag: e.target.value });
  }

  addTag() {
    if (this.state.tag !== '') {
      addTag(this.props.name, this.state.tag)
      this.state.tag = ''

      // refresh component
      this.setState(
        { reload: true },
        () => this.setState({ reload: false })
      )
    }
  }

  render() {
    return (
      <Card>
        <Card.Header>{this.getFileName(this.props.name)}</Card.Header>
        <Card.Body>
          <div>
            Tags: {getTags(this.props.name).map((tag) => <Tag name={tag} remover={this.remover} />)}
          </div>
          <InputGroup className="mb-3">
            <div>
              <FormControl
                placeholder="new tag name"
                value={this.state.tag}
                onChange={this.handleChange}
              />
            </div>
            <InputGroup.Append>
              <Button variant="primary" size="sm" onClick={() => this.addTag()}>Add</Button>
            </InputGroup.Append>
          </InputGroup>
          <video controls width="300px" src={path.resolve(this.props.name)}></video>
        </Card.Body>
      </Card>
    )
  }
}
