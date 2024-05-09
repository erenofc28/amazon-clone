import React from 'react'
import ReactDOM from 'react-dom/client'

import New from './new.tsx'
import './index.css'
import MernStackTodo from './assets/MernStackTodo.tsx'
import Demo from './assets/demo.tsx'
import Final from './assets/final.tsx'
import App from './App.tsx'
import { StateProvider } from './stateProvider.tsx'
import reducer, { initialState } from './reducer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

 <StateProvider initialState={initialState} reducer={reducer}>
    <App/>
    </StateProvider> 

)



