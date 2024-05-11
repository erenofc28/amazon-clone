
import { useEffect, useState } from 'react'
import './home.css'
// import Prodcut from './prodcut';
// import { useStateValue } from '../stateProvider';
import { useNavigate } from 'react-router-dom';
import './login.css'
import axios from 'axios';

const AddProduct = () => {
  // const [{basket}] = useStateValue();
  const navigate = useNavigate();

  const [title,setTitle]=useState("");
  const [ image,setImage ]=useState("");
  const [ price,setPrice ]=useState("");
  const [ rating,setRating ]=useState("");
  const [newData,setNewData]=useState([]);

  
  useEffect(()=>{
    const callme =()=>{
   const billy =    axios.get('https://server-for-amazon-clone.onrender.com/addProducts/')
 billy.then((dat) => {
  setNewData(
    dat.data.data.filter((dat:{email:string}) => {
      if (
        JSON.parse(localStorage.getItem("userInformation") || '{}').email == dat.email
      ) {
        return dat
      }
    })
  )

});
  }

callme()
 
  
  },[])

  

let energy = false;

  const AddProductToDB=()=>{
 
    if(title.length>0 && image.length>0 &&  price && rating)
    { 
        energy = true;
    }
 console.log(energy)

 if(energy == false){
  alert("please fill all the input boxes to procceed")
 }

    if(energy){
      

axios.post("https://server-for-amazon-clone.onrender.com/addProducts",
{ 
  email:JSON.parse(localStorage.getItem("userInformation") || '{}').email,
  title,
  image,
  price,
  rating
})
.then(()=>{console.log("successfully added")})
.catch((err)=>{console.log(err)})
navigate('/')
    }
    
  

  }


  return (
    <>   
        <div className='main_for_login'>

<div className="logo leo"  >
  <button className='btn_for_delete' onClick={()=>{
    if(newData.length>0){
         newData.map((dat:{_id:string})=>{

      axios.delete("https://server-for-amazon-clone.onrender.com/addProducts/"+dat._id)
    })
    navigate('/')
    }
 
    navigate('/')
  }} >
    <img className='amazon_img' src="../../public/6d5ec02e-48c7-449f-b2e2-eba0480ff9c8.jpg" alt="" />
  </button>


</div>    



<div className="dad">
    <div className="child">
          <div className='form'>
    <div className="sign_in">
<h2>Add Products</h2>
    </div>

     <div className="inputs">
<label htmlFor="">
Title 
  </label>
     <input type="text" onChange={(e)=>{setTitle(e.target.value)}} />

     <div className='pass'>
               <label htmlFor="">
                Image URL
  </label>
  <input type="text" className='pass_input' onChange={(e)=>{setImage(e.target.value)}} />    
     </div>

     <div className='pass'>
               <label htmlFor="">
Price
  </label>
  <input type="number" className='pass_input' onChange={(e)=>{setPrice(e.target.value)}} />    
     </div>

     <div className='pass'>
               <label htmlFor="">
Rating
  </label>
  <input type="number" className='pass_input' onChange={(e)=>{setRating(e.target.value)}} max={5} />    
     </div>
     

     
     <button  className='continue' onClick={()=>{AddProductToDB()}}>Add Product</button>
     
     </div>


    
   

  </div> 


</div>
</div>




<div className="for_fun"></div>



</div>
      
    </>
  )
}

export default AddProduct;
