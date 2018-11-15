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
      searchObjs: [],
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.setState = this.setState.bind(this);
    this.handleMultiple = this.handleMultiple.bind(this);
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
            this.setState({results: response.outputs[0].data.concepts});
          },
          function(err) {
            // there was an error
            console.log(err);
          }
      )
  }

  //handles multiple input files
  handleMultiple(e){
    console.log(e.target.files);
    let files = e.target.files;
    // console.log(files[0]);
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      // console.log(file);
      reader.readAsDataURL(file);
      let obj;
      reader.onload = () => {
        let base64 = reader.result.substring(23);
        reader.abort();
        obj = {base64: base64};
        // console.log(this.state.searchObjs);
      }
      reader.onloadend = () => {
        this.setState((state) => ({searchObjs:[...state.searchObjs, obj]}));
      }

    });

    //
    // app.inputs.create( this.state.searchObjs ).then(
    //     function(response) {
    //       console.log(1,response)
    //     },
    //     function(err) {
    //       // there was an error
    //     }
    //   );

      app.inputs.search({ concept: {name: 'document'} }).then(
        function(response) {
          console.log(2, response);
        },
        function(err) {
          // there was an error
        }
      );
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
        <div>
          <div className="multiple-files">
            <h3>Upload all your images</h3>
            <input type="file"
                   onChange={this.handleMultiple}
                   multiple />
          </div>
        </div>
        <Result results={this.state.results}
                url={this.state.url}/>
      </div>
    );
  }
}

export default App;
