import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAdd(e) {
    let { input } = this.state;

    e.preventDefault();

    if (input.length < 3) {
      this.setState({ error: true })
    } else {
      this.props.search(input.replace(/\s+/g, "+"));
      this.setState({ input: '' , error: false});
    }
  }

  render() {
    let { input, error } = this.state;

    return (
      <div>
        {error && <p>Please enter a valid search greater then 3 characters!</p>}
        <form onSubmit={this.handleAdd}>
          <label>Search A Giff</label>
          <input
            type='text'
            name='input'
            value={input}
            onChange={this.handleChange}
          />
          <input
            type='submit'
            value='search'
          />
        </form>
      </div>
    )
  }
}

export default SearchForm