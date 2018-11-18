import React from 'react';
import AppBar from '@material-ui/core/AppBar';


export default function Navbar(props){
  return(
    <AppBar title="Image Classifier">
      <div>
        <button onClick={() => props.setView('predict')}>Predict</button>
        <button onClick={() => props.setView('search')}>Search</button>
      </div>
    </AppBar>
  )
}
