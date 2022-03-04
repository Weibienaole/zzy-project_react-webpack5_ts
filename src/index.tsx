import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { JSB_init, setDomRem } from 'zzy-javascript-devtools'

import App from './App'

import './index.css'

import reducer from './reducers/index'; 

// function reducer(): void{}

// 1、创建 store
const store = createStore(reducer);

// JSbridge 初始化
JSB_init()

// console.log = function () { }

// rem 设置
setDomRem(8)



render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
