import { useReducer } from 'react';
import counterReducer from './reducers/counterReducer';

const Counter = () => {

  const [value , dispatch ] =useReducer(counterReducer , 0)
  
  return (
    <div>
      Counter ({value})
      <button
        onClick={() => dispatch({type: 'INCREMENT'})}
        className="btn btn-primary mx-1"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch({type: 'DECREMENT'})}
        className="btn btn-primary mx-1"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
