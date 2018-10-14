import React, { Component } from 'react';
import GiphyGridItem from './GiphyGridItem'

class GiphyGrid extends Component {
  render() {
    let giphyItems = this.props.gifs.map((gif, idx) => <GiphyGridItem url={gif.images.fixed_height.url} key={idx} alt={gif.images.fixed_height.url}/>)
    return(
      <div className='giphy-grid-container'>
      {giphyItems}
      </div>
    )
  }
}

export default GiphyGrid