import React from 'react'
import Login from './components/login.tsx'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp.tsx'
import Home from './components/home.tsx'
import Checkout from './components/checkout.tsx'
import Address from './components/address.tsx'
import Payment from './components/payment.tsx'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AddProduct from './components/addProduct.tsx'
import OrderDisplay from './components/orderDisplay.tsx'

const promise = loadStripe(
 'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3' 
)
const App = () => {
  return (
    <>
       <Router>
     
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/checkout/address' element={<Address/>}/>
            <Route path={'/addProducts'} element={<AddProduct/>}/>
            <Route path={'/orders'} element={<OrderDisplay/>}/>
       

            <Route path='/checkout/address/payment' element={    <Elements  stripe={promise}>    
               <Payment/>   
                 </Elements>      }/>
            


            </Routes>
        
       </Router>
     
    </>
  )
}

export default App; 
