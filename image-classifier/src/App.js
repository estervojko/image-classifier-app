import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar.js'
import Search from './components/Search.js'
import Predict from './components/Predict.js'
import PredictResult from './components/PredictResult.js'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


// The JavaScript client works in both Node.js and the browser.
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
      searchText: '',
      currentView: '',
      hits: [],
      error: '',
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMultiple = this.handleMultiple.bind(this);
    this.handleSubmitUpload = this.handleSubmitUpload.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.setView = this.setView.bind(this);
    this.resetState = this.resetState.bind(this);

    //handlers for the Search page when you search pictures you've uploaded
    this.searchImages = this.searchImages.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
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
    }
  }

  async handleSubmitUpload(e){
    e.preventDefault();
    console.log("works")
    await app.models.predict(Clarifai.GENERAL_MODEL, this.state.base64)
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
    this.setView('predict-result');
  }

  handleURL(e){
    this.setState({url: e.target.value })
  }

  //submits the image url to the api
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
      );
    this.setView('predict-result');
  }

  //handles multiple input files
  handleMultiple(e){
    let files = e.target.files;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let obj;
      reader.onload = () => {
        let base64 = reader.result.substring(23);
        reader.abort();
        obj = {base64: base64};
      }
      reader.onloadend = () => {
        this.setState((state) => {
          console.log(this.state.searchObjs)
          return {searchObjs:[...state.searchObjs, obj]}});
      }
    });
    }

    //searches by concept to the api
    searchImages(e){
      e.preventDefault();
      app.inputs.search({ concept: {name: this.state.searchText} }).then(
        (response) => {
          console.log(2, response.hits);
          this.setState({hits: response.hits,
                         error: ''});
        },
        (err) => {
          console.log(err.statusText);
            this.setState({error: err.statusText});
        }
      );


    }

    //makes the search input a controlled component
    handleInputSearch(e){
      this.setState({searchText: e.target.value});
    }

    //sends images to the api
    handleSearchSubmit(e){
      e.preventDefault();
      app.inputs.create( this.state.searchObjs ).then(
          function(response) {
            console.log(1,response)
          },
          function(err) {
            // there was an error
          }
        );
    }

    //renders the view
    getView(){
      switch(this.state.currentView){
        case 'predict' : return <Predict handleUpload={this.handleUpload}
                                         handleURL={this.handleURL}
                                         handleSubmit={this.handleSubmit}
                                         handleSubmitUpload={this.handleSubmitUpload}
                                         results={this.state.results}
                                         url={this.state.url}/>
        case 'search'  : return <Search  handleMultiple={this.handleMultiple}
                                         handleSearchSubmit={this.handleSearchSubmit}
                                         searchImages={this.searchImages}
                                         handleInputSearch={this.handleInputSearch}
                                         hits={this.state.hits}
                                         error={this.state.error}/>
        case 'predict-result' : return <PredictResult results={this.state.results}
                                                      url={this.state.url}
                                                      setView={this.setView}
                                                      resetState={this.resetState}
                                                      />
      }
    }

    setView(view){
      this.setState({currentView: view});
    }

    //resets the state of result and url when you click back on Predict

    resetState(){
      this.setState({url: '',
                     results: [],
                     base64: {
                       base64: ''
                     }
                   })
    }

  render(){
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Image Classifier App</h1>
          <Navbar setView={this.setView} />
          {this.getView()}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
