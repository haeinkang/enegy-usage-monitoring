import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  incrementAsync 
} from '../state/counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementAsync(10))}>incrementByAmount</button>
        <button onClick={() => dispatch(decrement({
          x: 1, 
          y: 2, 
        }))}>Decrement</button>
      </div>
    </div>
  );
}

export default Counter;