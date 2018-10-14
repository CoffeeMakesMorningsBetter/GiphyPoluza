import React, { Component } from 'react';
import SearchForm from './SearchForm'
import { Error } from './Error'
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
  }

  async onScroll() {
    let { searchTerm, limit, position, giphy } = this.state;
    if(this.myRef && this.myRef.current.scrollTop > position && searchTerm && giphy.length < 51) {
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

    await fetch(`https://api.giphy.com/v1/gifs/trending?&api_key=${API_KEY}`)
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw new Error('Something went wrong!')
      }
    })
    .then(json => this.setState({ giphy: json.data, isLoading: false, error: null}))
    .catch(error => console.log('THIS IS MY GOD DAMN ', error));
  }

  // async componentDidMount() {
  //   try {
  //     this.setState({ isLoading: true })
  //     let search = await fetch(`https://api.giphy.com/v1/gifs/turd?&api_key=${API_KEY}`)
  //     try {
  //       let res = search.json()
  //       this.setState({ giphy: res.data, isLoading: false, error: null })
  //     } catch(error) {
  //       throw new Error('Somethin was requested wrong')
  //     }
  //   } catch(error) {
  //     this.setState({ error, isLoading: false })
  //   }
  // }


  async search(gifSearch) {
    this.setState({ isLoading: true });

    await fetch(`https://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${API_KEY}&limit=25`)
    .then(res => res.json())
    .then(json => this.setState({ giphy: json.data, isLoading: false, searchTerm: gifSearch, position: 3000, limit: 25 }))
    .catch(error => this.setState({ error, isLoading: false }));
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

        <SearchForm search={this.search}/>
        <GiphyGrid gifs={giphy}/>
      </div>
    );
  }
}

export default App;
