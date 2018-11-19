import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

function PredictResult(props){
    return (
      <div>
        <button onClick={() => { props.setView('predict')
                                 props.resetState()}}>Back</button>
        <br></br>
        <img src={props.url} alt="user pic" className="predict-image" />
        <div>
          <GridList cols={3}>
            {props.results.map((el) => (
              <div key={el.id}>
                <p>{el.name}</p>
                <p>{el.value}</p>
              </div>
              ))
            }
          </GridList>
        </div>
      </div>
   )
}

export default PredictResult;
