import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Crypto from './crypto';
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
//console.warn(Numbers.ABCD(3));
//console.warn(Numbers.reverse(7896541));
//console.warn(Strings.permutations('abcd'));
//console.warn(Numbers.EratosthenesPrimes(100));
//console.warn(Numbers.convertNumberToBase(109, 2));
//console.warn(Numbers.inverseNumberByModulo(13, 121));
//console.warn(Numbers.powerNumberByModulo(13, 109, 121));
console.warn(Numbers.chineseRemainder([
    { r: 2, m: 3 },
    { r: 3, m: 5 },
    { r: 2, m: 7 },
]));
const keyPair = Crypto.generateKeys({ keyLength: 7, includePrimesInPrivateKey: true });
const encrypted = Crypto.encrypt(12345, keyPair.publicKey);
const decrypted = Crypto.decrypt(encrypted, keyPair.privateKey);
console.warn(keyPair);
console.warn('12345 -> %s -> %s', encrypted, decrypted);