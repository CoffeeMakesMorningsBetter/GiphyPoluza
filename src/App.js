import React, { Component } from 'react';
import SearchForm from './SearchForm'
import UploadForm from './UploadForm'
import { Error } from './Error'
import { handleErrors } from './helper'
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
      position: 3000,
      error: null
    }
    this.search = this.search.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.throttle = _.throttle(this.onScroll, 1000);
    this.uploadGif = this.uploadGif.bind(this)
  }

  async onScroll() {
    let { searchTerm, limit, position } = this.state;
    if(this.myRef && this.myRef.current.scrollTop > position && searchTerm) {
      console.log(position)
      await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=${limit+25}`)
      .then(res => res.json())
      .then(json => this.setState({giphy: json.data, limit: limit + 25, position: position * 2}))
      .catch(error => this.setState({error, isLoading: false}));
    }
  }

  onChange(e) {
    e.persist()
    this.throttle(e)
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    await fetch(`https://api.giphy.com/v1/gifs/trending?&api_key=${API_KEY}&limit=50`)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => this.setState({ giphy: json.data, isLoading: false, error: null}))
    .catch(error => this.setState({ error: 'Something is wrong', isLoading: false}));
  }

  async search(gifSearch) {
    this.setState({ isLoading: true });

    await fetch(`https://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${API_KEY}&limit=25`)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      if(json.data.length < 1) {
        throw new Error()
      } else {
        this.setState({ giphy: json.data, isLoading: false, searchTerm: gifSearch, position: 3000, limit: 25, error: null })
      }
    })
    .catch(error => this.setState({ error: 'Nothing meets that search criteria', isLoading: false }));
  }

  async uploadGif(formData) {
    let postData = {
      api_key: API_KEY,
      source_post_url: 'https://example.com'
    }

    await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
      body: JSON.stringify(postData)
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => console.log(''))
    .catch(err => alert('Something is wrong!'))
  }

  render() {
    let { isLoading, giphy, error } = this.state
    if(error) {
      return(
        <div className="parent" onScroll={this.onChange.bind(this)} ref={this.myRef}>
        <h1>Giphy Poluza!</h1>

        <SearchForm search={this.search}/>
        <Error error={error}/>
      </div>
      )
    }
    if(isLoading) {
      return(
        <div className="parent">
          <div className="loader"></div>
        </div>    
      )
    }
    return (
      <div className="parent" onScroll={this.onChange.bind(this)} ref={this.myRef}>
        <h1>Giphy Poluza!</h1>
        <UploadForm dataUpload={this.uploadGif}/>
        <SearchForm search={this.search}/>
        <GiphyGrid gifs={giphy}/>
      </div>
    );
  }
}

export default App;
