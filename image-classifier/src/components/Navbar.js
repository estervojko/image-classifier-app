import React from 'react';

export default function Navbar(props){
  return(
    <div>
      <button onClick={() => props.setView('predict')}>Predict</button>
      <button onClick={() => props.setView('search')}>Search</button>
    </div>
  )
}
