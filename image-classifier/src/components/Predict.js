import React from 'react';

export default function Predict(props){
  return(
    <div>
      <div className="file-upload">
        <h3>Upload a file:</h3>
        <form onSubmit={props.handleSubmitUpload}>
          <input type="file"
                 className="input"
                 onChange={props.handleUpload}/>
          <button>Submit</button>
        </form>
      </div>
      <div className="url-link">
        <h3>Post a url link:</h3>
        <form onSubmit={props.handleSubmit}>
          <input type="text"
                 name="link"
                 className="input"
                 onChange={props.handleURL}/>
          <br></br>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
