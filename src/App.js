import React, { Component } from 'react';
import SearchForm from './SearchForm'
import GiphyGrid from './GiphyGrid'
import {throttle} from 'lodash'
import './App.css';

const API_KEY = process.env.REACT_APP_SECRET_CODE

class App extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      giphy: [],
      isLoading: false,
      limit:25,
      searchTerm: '',
      position: 3000
    }
    this.search = this.search.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  async onScroll() {
    let searchTerm = this.state.searchTerm
    let counter = this.state.limit + 25
    let position = this.state.position
    let giphy = this.state.giphy
    if(this.myRef && this.myRef.current.scrollTop > position && searchTerm && giphy.length < 51) {
      console.log(position)
      await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=${counter}`)
      .then(res => res.json())
      .then(json => this.setState({giphy: json.data, limit: counter + 25, position: position * 2}));
    }
  }

  async componentDidMount() {
    await fetch(`https://api.giphy.com/v1/gifs/trending?&api_key=${API_KEY}`)
    .then(res => res.json())
    .then(json => this.setState({giphy: json.data}));
  }

  async search(gifSearch) {
    console.log(API_KEY)
    await fetch(`https://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${API_KEY}&limit=25`)
    .then(res => res.json())
    .then(json => this.setState({giphy: json.data, searchTerm: gifSearch}));
  }

  render() {
    return (
      <div className="parent" onScroll={this.onScroll} ref={this.myRef}>
        <h1>Giphy Poluza!</h1>

        <SearchForm search={this.search}/>
        <GiphyGrid gifs={this.state.giphy}/>
        <div>Fuck!</div>
      </div>
    );
  }
}

export default App;
