import React from 'react';

const GiphyGridItem = ({url, alt}) => (
  <div className='giphy-grid-item'>
    <img src={url} alt={alt}></img>
  </div>
)

export default GiphyGridItem