import React from 'react';

export const Error = ({ error }) => (
  <div>
    <p>{`${error}`}</p>
    <div>
      <img src="https://media.giphy.com/media/J4X4pqVvazgR2/giphy.gif" alt="Error!"></img>
    </div>
  </div>
)