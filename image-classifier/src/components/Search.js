import React from 'react'

export default function Search(props){
  return(
      <div>
        <div className="multiple-files">
          <h3>Upload all your images</h3>
          <input type="file"
                 onChange={props.handleMultiple}
                 multiple />
        </div>
      </div>
  )
}
