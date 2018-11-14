import React from 'react';

function Result(props){
    return (
      <div>
        <img src={props.url} alt="user pic" />
        {props.results.map((el) => (
          <div key={el.id}>
            <p>{el.name}</p>
            <p>{el.value}</p>
          </div>
          ))
        }
      </div>
   )
}

export default Result;
