import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./demo.css"
const Demo = () => {
const [namey,setNamey]= useState();
const[database,setDatabase]=useState([]);
const [len,setLen]=useState(1);
const[editId,setEditId]=useState(0);
const[newValue,setNewValue]=useState();

const handleAdd=()=>{
    if(namey.trim() !== "")
    {
        console.log("jii",namey)
           axios.post("http://localhost:7000/data",{
    id:len,
    name:namey
})
.then((msg)=>{
    setLen(len+1);
    console.log(msg)})
.catch((err)=>{console.log(err)}) 
    }

}

const get =()=>{
    fetch("http://localhost:7000/data")
    .then((res)=>{
        return(res.json())
    })
    .then((res)=>{setDatabase(res)})
}

useEffect(()=>{
get();

},[])




const handleUpdate=()=>{
    
   const mainid = database.filter((d)=>{
        if(d.id == editId){
           return d._id;
        }
        
       
    })
console.log("mainid",mainid[0]._id)
    axios.put("http://localhost:7000/data/"+mainid[0]._id,
    {
        id : editId,
        name : newValue
    })
    .then((msg)=>{
        get();
        console.log(msg)})
    .catch((err)=>{console.log(err)}) 

}
    // console.log('id',editId)
 


  return (
    <><ul className='m-3'>
        {
            database.length>0?database.map((data)=>{
                return(<>
                        <li  >
                          <div  className='p-1 hi'  >
                          <p> id : {data.id}</p> 
                           <p> data : {data.name}</p>   
                            </div>  </li>
                


                
                
                       </>)
            }):<p>no data found</p>
        }
    </ul>







    <div className="parent d-flex flex-column">
<div>     
     <input className='m-4' placeholder='Add Something in the DataBase' type="text" onChange={(e)=>{setNamey(e.target.value)}} />
      <button onClick={()=>{
        handleAdd();
        get();
      }}>Add</button>
      
      </div>
 <div>  
            <input type="text" placeholder='id of item to update here' onChange={(e)=>{setEditId(e.target.value)}}  className='m-4' /> 
      <input type="text"  placeholder='put new value of the item here' onChange={(e)=>{setNewValue(e.target.value)}}  />
      <button onClick={handleUpdate}>Update</button>

      </div>
</div>







     

    </>
  )
}

export default Demo;
