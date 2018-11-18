import React from 'react';

function PredictResult(props){
    return (
      <div>
        <button onClick={() => { props.setView('predict');
                                 props.resetState();}}>Back</button>
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

export default PredictResult;
