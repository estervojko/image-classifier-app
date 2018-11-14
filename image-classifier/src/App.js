// The JavaScript client works in both Node.js and the browser.
import React, { Component } from 'react'
import './App.css'
import Result from './components/Result.js'
// Require the client
const Clarifai = require('clarifai');


// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: '20dba521121849139460c9a07915c55a'
});

// predict the contents of an image by passing in a url

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      base64: {
        base64: ''
      },
      url : '',
      results: [],
    }
    this.handleUpload = this.handleUpload.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState = this.setState.bind(this);
  }

  handleUpload(e){
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);    //reads the image as base64 string file
    reader.onload = () => {
    const base64 = reader.result.substring(23);
    this.setState((state) => ({
        base64 : {
          ...state.base64,
          base64: base64,
        }
    }));
    console.log(this.state.base64);
    reader.abort();
    app.models.predict(Clarifai.GENERAL_MODEL, this.state.base64)
      .then(
             (response) => {
            // do something with response
            console.log(response.outputs[0].data.concepts);
            this.setState({results: response.outputs[0].data.concepts});
          },
          function(err) {
            // there was an error
            console.log(err);
          }
      )
    }
  }

  handleURL(e){
    this.setState({url: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    app.models.predict(Clarifai.GENERAL_MODEL, this.state.url)
      .then(
            (response) => {
            // do something with response
            console.log(response.outputs[0].data.concepts);
            this.setState((state) => ({
              results: [
                ...state.results,
                response.outputs[0].data.concepts,
              ]
            }));
          },
          function(err) {
            // there was an error
            console.log(err);
          }
      )
  }

  render(){
    return (
      <div className="App">
        <h1>Image Classifier App</h1>
        <div className="file-upload">
          <h3>Upload a file:</h3>
          <input type="file"
                 className="input"
                 onChange={this.handleUpload}/>
        </div>
        <div className="url-link">
          <h3>Post a url link:</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text"
                   name="link"
                   className="input"
                   onChange={this.handleURL}/>
            <br></br>
            <button>Submit</button>
          </form>
        </div>
        <Result results={this.state.results} />
      </div>
    );
  }
}

export default App;
