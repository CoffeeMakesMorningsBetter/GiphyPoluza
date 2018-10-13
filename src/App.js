import React, { Component } from 'react';
import SearchForm from './SearchForm'
import './App.css';

const API_KEY = process.env.REACT_APP_SECRET_CODE

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      giphy: [],
      isLoading: false,
    }
    this.search = this.search.bind(this)
  }

  async componentDidMount() {
    await fetch(`https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${API_KEY}&limit=5`)
    .then(res => res.json())
    .then(json => this.setState({giphy: json.data}));
  }

  async search(gifSearch) {
    await fetch(`https://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${API_KEY}&limit=5`)
    .then(res => res.json())
    .then(json => this.setState({giphy: json.data}));
    console.log('Finished Search')
  }

  render() {
    return (
      <div className="App">
        <h1>Giphy Poluza!</h1>

        <SearchForm search={this.search}/>
      </div>
    );
  }
}

export default App;
