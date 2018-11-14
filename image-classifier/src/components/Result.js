import React from 'react';

function Result(props){
  return (
    <div>
      {props.results.map((el) => (
        <p key={el.id}>{el.name}</p>
      ))}
    </div>
  )
}

export default Result;
