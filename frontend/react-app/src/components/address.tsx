import React, { useEffect, useState } from 'react'
import './home.css'
import Prodcut from './prodcut';
import { useStateValue } from '../stateProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Address = () => {
    const [{basket}, dispatch ] = useStateValue();
    const navigate = useNavigate();

    const[name,setName]=useState("");
    const[number,setNumber]=useState("");
    const[flat,setFlat]=useState("");
  const[area,setArea]=useState("");
    const[landmark,setLandmark]=useState("");
    const[town,setTown]=useState("");
const[states,setStates]=useState("");
const[cartFromDb,setCartFromDb] = useState([]);


useEffect(()=>{
  const cartfromDb = axios.get("https://server-for-amazon-clone.onrender.com/addCart/")

  cartfromDb.then((dat) => {
    setCartFromDb(
      dat.data.data.filter((dat) => {
        if (
          JSON.parse(localStorage.getItem("userInformation")).email ==
          dat.email
        ) {
          return dat;
        }
      })
    )
  });


  
  
},[])
// console.log( "total",cartFromDb);

let pp = cartFromDb.map((dataa) => {
  return dataa.price;
});
// console.log(pp)
let ans = 0;
let filterd = pp.filter((dat) => {
  ans += Number(dat);
  console.log("dat", dat);
  return ans;
});


let products = cartFromDb.map((dat)=>{
  return ({image:dat.image,
           price:dat.price,
           title:dat.title
          })
})





console.log("total amount",products);

  
const addAddress =(e)=>{
    e.preventDefault();
    localStorage.setItem("address",JSON.stringify({
      name:name,
      phoneNumber:number,
      flat:flat,
      area:area,
    landmark:landmark,
      town:town,
      state:states
    }))
 


  



}

let trueOrFalse=false

const result =()=>{
  if(name.length>0 && number.length>0 && flat.length>0 && area.length>0  && landmark.length>0 && town.length>0  && states.length>0 ){
    trueOrFalse = true;
  }
}








  return (
    <>
    <div className="main_for_nav">
    <nav> 

<div className="logo_shield">
<img src="../../public/black amazon.jpg" className='logo_img' alt="" /> 
</div>



{/* <div className="search_bar"> */}


   <input type="text" placeholder='Search' className='search_input' />
<button className='search_btn'> <img className='search_img' src="../../public/magnifying-glass-solid.png" alt="" /></button> 
{/* </div> */}

<div className="right_container">

<div className="hello">
<a className="a_orders_1">Hello </a>  
  {JSON.parse(localStorage.getItem("userInformation")) ? (
                <a href="/" className="a_orders_2">
                  {JSON.parse(localStorage.getItem("userInformation")).name}
                </a>
              ) : (
                <a href="/" className="a_orders_2">guest</a>
              )}
</div>

<div className="orders">
<a href="" className="a_orders_1">Your </a>    
        <a href={JSON.parse(localStorage.getItem("userInformation"))?"orders":"/"} className="a_orders_2">Orders  </a>    
             
      </div>

<div className="basket">
  <a href="" > </a>
<button className='basket_btn' >
<img className='cart_icon' src="../../public/cart-shopping-solid.png" alt="" />
</button> 
   <p>{cartFromDb?cartFromDb.length:0 }</p>
</div>

</div>


<div className='demo'>
<input type="text" placeholder='Search' className='search_input_two' />
<button className='search_btn_two'> <img className='search_img' src="../../public/magnifying-glass-solid.png" alt="" /></button> 

</div> 


</nav>
    </div>

    <div className="main_for_address">


 <div className="inputs">
       <label htmlFor="">Full Name</label>
   <input type="text"
    onChange={(e)=>{setName(e.target.value)}}
     />

   <label htmlFor="">Phone Number</label>
   <input type='text'
    onChange={(e)=>{setNumber(e.target.value)}} 
    />

   <label htmlFor="">Flat, House mo, Building, Company, Apartment</label>
   <input type="text"
    onChange={(e)=>{setFlat(e.target.value)}}
     />

   <label htmlFor="">Area, Colony,Street, Sector, Village</label>
   <input type="text" 
   onChange={(e)=>{setArea(e.target.value)}} 
   />

   <label htmlFor="">Landmark</label>
   <input type="text"
    onChange={(e)=>{setLandmark(e.target.value)}} 
    />

   <label htmlFor="">Town/City</label>
   <input type="text"
    onChange={(e)=>{setTown(e.target.value)}} 
    />

   <label htmlFor="">State</label>
   <input type="text" 
   onChange={(e)=>{setStates(e.target.value)}}
    />

   <button className='delivery_address'
    onClick={(e)=>{
      console.log(trueOrFalse)
      result();
      if(trueOrFalse){
           addAddress(e)
           navigate("payment")
      }
      
   
    }}
    >Delivery in This Address</button>

 </div>

    </div>
   
    </>
  )
}

export default Address
