
import Login from './components/login.tsx'
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp.tsx'
import Home from './components/home.tsx'
// import Checkout from './components/checkout.tsx'
import Address from './components/address.tsx'
// import Payment from './components/payment.tsx'
// import {Elements} from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import AddProduct from './components/addProduct.tsx'
// import OrderDisplay from './components/orderDisplay.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Checkout from './components/checkout.tsx'
import AddProduct from './components/addProduct.tsx'
import OrderDisplay from './components/orderDisplay.tsx'
import Payment from './components/payment.tsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'



const promise = loadStripe(
 'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3' 
)

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,

//       children: [
//         {  path:'checkout', element:<Checkout/>} ,
//         { path: "/login", element: <Login/> },
//         { path: '/signUp', element: <SignUp/> },
    
//    ]
},{   path: "login",
   element: <Login/>,},
   {   path: "signUp",
   element: <SignUp/>, },
   {   path: '/checkout',
   element: <Checkout/>, },
   {   path: '/checkout/address',
   element: <Address/>, },
   {   path:'/addProducts',
   element: <AddProduct/>, },
   {   path:'/orders',
   element: <OrderDisplay/>, },
   {   path:'/checkout/address/payment',
   element:  <Elements  stripe={promise}>    
               <Payment/>   
                 </Elements> } ,

])
