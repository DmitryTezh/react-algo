import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Numbers from './numbers';
import * as Strings from './strings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//console.warn(Numbers.resolveABCD(3));
//console.warn(Numbers.reverse(7896541));
//console.warn(Strings.getPermutations('abcd'));
//console.warn(Numbers.Eratosthenes(100));
console.warn(Numbers.GCD(3009,894));