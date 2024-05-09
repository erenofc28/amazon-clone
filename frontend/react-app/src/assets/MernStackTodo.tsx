
import { useEffect, useState } from 'react'
import './MernStackTodo.css'
import axios  from 'axios';




const MernStackTodo = ()=>{


 const [error,setError]= useState("");
 const [title,setTitle]= useState("");
 const [description,setDescription]= useState("");
 const [todo,setTodo]=useState([]);
 const [message,setMessage]= useState("");

 const [editId,setEditId]=useState(-1);

 const [editTitle,setEditTitle]= useState("");
 const [editDescription,setEditDescription]= useState("");
 


 console.log('todo',todo)



   const handleSubmit = () => {

  if(title.trim() !== "" && description.trim() !== "" ){
 axios.post("http://localhost:1000/todo",{
  title : title,
  description : description,
 })
 .then((msg)=>{
          setError("")
           setTodo([...todo,{title,description}]) 
          //  setDescription("");
          //  setTitle("");
             setMessage("item added successfully")
             setTimeout(() => {
              setMessage("")
             }, 3000);
  console.log(msg)
 })
 .catch((err)=>{
        setError("unable to create todo item")
  console.log(err)
 })
  }else{
    setError("Please Add Above Details")
  }

        // if(title.trim() !== "" && description.trim() !== "" ){
        //     fetch("http://localhost:1000/todo",
        //     {
        //        method: "POST",
        //        headers:{'Content-type':'application/json'},
        //        body: JSON.stringify({title,description})
        // })
        // .then((res)=>{
        //   if (res.ok) {
        //      setTodo([...todo,{title,description}]) 
        //      setMessage("item added successfully")
        //      setTimeout(() => {
        //       setMessage("")
        //      }, 3000);
        //      console.log('hiii by friend')
        //   } else {
        //     console.log('hiii by friend')
        //     setError("unable to create todo item")
        //   }
          
        
        // }
        
        // )
        // .catch((err)=>{console.log(err)})
        
        //             }
 
        }




  const  getItems = ()=>{
     fetch("http://localhost:1000/todo")
     .then((res)=>{
      return(res.json())
    })
      .then((ress)=>{
        setTodo(ress)
      })
   
  }

  console.log(editId)

  //const getItems = ()=>{
  //   axios.get("http://localhost:1000/todo")
  //   .then((data)=>{
  //    console.log(data.title)
  //   })
  // }
useEffect(()=>{
getItems();
},[])

  
    const handleupdate=()=>{
      if(editTitle.trim() !== "" && editDescription.trim() !== "" ){
        console.log("http://localhost:1000/todo/"+editId)
        axios.put("http://localhost:1000/todo/"+editId,{
         title : editTitle,
         description : editDescription,
        })
        .then((msg)=>{
                 setError("")
            const updatedtodo =  todo.map((t)=>{
               if(t._id == editId){
                    t.title = editTitle;
                    t.description = editDescription;
                  }
                
 
                 })
                    console.log('uuuu',updatedtodo)
                
                    setMessage("item Updated successfully")
                    setTimeout(() => {
                     setMessage("")
                    }, 3000);
         console.log(msg)
        })
        .catch((err)=>{
               setError("unable to create todo item")
         console.log(err)
        })
      setEditId(-1)
    }}
  

    const handleDelete=(id)=>{

     
      axios.delete("http://localhost:1000/todo/"+id)
      const upp = todo.filter((data)=>{
        if(data._id !==id){
          return data;
        }
      })
      setTodo(upp);
      setMessage("Deleted Successfully")
      setTimeout(() => {
        setMessage("")
      }, 3000);

     


    }



  return (
    <>
    <div className="c">
       <div className=' p-3 bg-success text-light'>
        <h2>ToDo Project With MERN Stack</h2> 
       </div>
          <div className='row'>
        <h3 className='m-2'>Add Item</h3>
       {message &&  <p className='text-success m-2'>{message}</p>} 
          <div className="form-group d-flex gap-2 m-2">
              <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder='Title' className='form-control' />
              <input type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} placeholder='Description' className='form-control' />
         <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
         
          </div>
          {error && <p className='text-danger m-2 mb-3'>{error}</p>}
        
     
       </div>
       <h2 className='mt-5 m-3'>Tasks</h2>
<ul  className='d-flex  p-2 list-group'>

{todo.map((to)=>{
             return(<>
                    



<li className='list-group-item d-flex flex-row  justify-content-between  bg-light m-2 ' key={to._id}>
     <div className='d-flex flex-column'>

      {editId == -1 || editId !== to._id?
      <>
        <span className='fw-bold p-1' >{to.title}</span>
  <span className='p-1'>{to.description}</span >
      </> :<>
      <div className="form-group d-flex gap-2 m-2">
              <input type="text" onChange={(e)=>{setEditTitle(e.target.value)}} value={editTitle} placeholder='Title' className='form-control' />
              <input type="text" onChange={(e)=>{setEditDescription(e.target.value)}} value={editDescription} placeholder='Description' className='form-control' />
       
         
          </div>
      
           </>  }

</div>

<div   className='p-2 mt-2'>
  {  editId == -1 || editId !== to._id? 
  <>
    <button className='btn btn-light m-1 update' onClick={()=>{
    setEditId(to._id);
    setEditTitle(to.title);
    setEditDescription(to.description);
  }}>Edit</button>
   <button className='btn btn-danger m-1 dlt' onClick={()=>{handleDelete(to._id)}}>Delete</button>
  </>:<>
  <button className='btn btn-light m-1 update' onClick={handleupdate}>Update</button>
  <button className='btn btn-danger m-1 dlt' onClick={()=>{setEditId(-1)}}>Cancel</button>
  
  
      </>  }



</div>
</li>




             
             
             
                   
                   
                    </>

             )
      }) }

</ul>
   
      



    </div>

   
    </>
  )
}

export default MernStackTodo;
