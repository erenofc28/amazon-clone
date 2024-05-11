// import React from 'react'
import ReactDOM from "react-dom/client";

// import New from './new.tsx'
import "./index.css";
// import MernStackTodo from './assets/MernStackTodo.tsx'
// import Demo from './assets/demo.tsx'
// import Final from './assets/final.tsx'
// import App from "./App.tsx/index.ts";

import { StateProvider } from "./stateProvider.js";
import reducer, { initialState } from "./reducer.tsx";
// import App from './App';
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <RouterProvider router={router} />
  </StateProvider>
);
