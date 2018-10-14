import React, { Component } from 'react';
import SearchForm from './SearchForm'
import GiphyGrid from './GiphyGrid'
import _ from 'lodash'
import './App.css';

const API_KEY = process.env.REACT_APP_SECRET_CODE

class App extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      giphy: [],
      isLoading: false,
      limit: 25,
      searchTerm: '',
      position: 3000
    }
    this.search = this.search.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.throttle = _.throttle(this.onScroll, 1000)
  }

  async onScroll() {
    let { searchTerm, limit, position, giphy } = this.state

    if(this.myRef && this.myRef.current.scrollTop > position && searchTerm && giphy.length < 51) {
      console.log(position)
      await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=${limit+25}`)
      .then(res => res.json())
      .then(json => this.setState({giphy: json.data, limit: limit + 25, position: position * 2}));
    }
  }

  onChange(e) {
    e.persist()
    this.throttle(e)
  }

  async componentDidMount() {
    await fetch(`https://api.giphy.com/v1/gifs/trending?&api_key=${API_KEY}`)
    .then(res => res.json())
    .then(json => this.setState({giphy: json.data}));
  }

  async search(gifSearch) {
    await fetch(`https://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${API_KEY}&limit=25`)
    .then(res => res.json())
    .then(json => this.setState({giphy: json.data, searchTerm: gifSearch, position: 3000, limit: 25}));
  }

  render() {
    return (
      <div className="parent" onScroll={this.onChange.bind(this)} ref={this.myRef}>
        <h1>Giphy Poluza!</h1>

        <SearchForm search={this.search}/>
        <GiphyGrid gifs={this.state.giphy}/>
        <div>Fuck!</div>
      </div>
    );
  }
}

export default App;
