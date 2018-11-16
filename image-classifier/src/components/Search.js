import React from 'react'

export default function Search(props){
  return(
      <div>
        <div className="multiple-files">
          <h3>Upload all your images</h3>
          <form onSubmit={props.handleSearchSubmit}>
            <input type="file"
                   onChange={props.handleMultiple}
                   multiple />
            <button>Submit for evaluation</button>
          </form>
          <form onSubmit={props.searchImages}>
            <input type="text" onChange={props.handleInputSearch}/>
            <button>Search</button>
          </form>
        </div>
        <img src={props.hits}/>
      </div>
  )
}
