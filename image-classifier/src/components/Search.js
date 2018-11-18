import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


export default class Search extends Component{
  renderResults(){
    if(this.props.error !== 'Bad Request'){
      return(
        <div>
          {
            this.props.hits.map((hit) => {
              console.log(hit.input.data.image.url)
              return (
                <div key={hit.input.data.image.url}>
                  <img src={hit.input.data.image.url}/>
                </div>)
              })
          }
        </div>
      )
    }
    else{
        return (<p>Use another keyword</p>)
      }
  }

  render(){
    return(
        <div>
          <div className="multiple-files">
            <h3>Upload all your images</h3>
              <form onSubmit={this.props.handleSearchSubmit}>
                <input type="file"
                       onChange={this.props.handleMultiple}
                       multiple />
                <button>Submit for evaluation</button>
              </form>

            <form onSubmit={this.props.searchImages}>
              <TextField type="text" onChange={this.props.handleInputSearch}/>
              <button>Search</button>
            </form>
          </div>
          {this.renderResults()}
        </div>
    )
  }
}
