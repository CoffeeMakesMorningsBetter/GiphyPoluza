import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAdd(e) {
    e.preventDefault()

    this.props.search(this.state.input.replace(/\s+/g,"+"))
    this.setState({input: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleAdd}>
        <label>Search A Giff</label>
        <input
          type='text'
          name='input'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <input
          type='submit'
          value='search'
        />
      </form>
    )
  }
}

export default SearchForm