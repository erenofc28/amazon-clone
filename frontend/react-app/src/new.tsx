import {useState} from 'react'
import axios from 'axios'

const New = () => {
  const [data,setData]=useState([{
    d:[],
    id:0,
    message:null,
    intervalIsSet:false}]);

//  const componentDidMount = {
//     getDataFromDb()

//     if(!intervalIsSet){
//       let interval = setInterval(getDataFromDb,1000);
//       setData({intervalIsSet: interval})

//     }
//   }
//  const componentWillUnmount={
//   if(intervalIsSet)
//   {
//    clearInterval(intervalIsSet);
//    setData({intervalIsSet : null})
//   }
//  }

//  const getDataFromDb=()=>{
//   fetch('http://localhost:4028/api/getData')
//   .then((data)=> data.json())
//   .then((res)=> setData({d : res.d}))
//  }

 const putDataToDb=()=>{
  let currentIds= data.map((data)=>{data.id } )
 let idToBeAdded=0;
 while(currentIds.includes(idToBeAdded)){
  ++idToBeAdded;
 }

 axios.post('http://localhost:4028/api/putData',{
  id : idToBeAdded,
  message : message,
 })

 }


//  const deleteFromDb=(deleteMessage)=>{
//   let objectToDelete = null;
//   console.log(deleteMessage)
//   data.forEach((dat)=>{
//     if(dat.message == deleteMessage){
//       objIdToDelete = dat._id;
//     }
//   });

//   axiios.delete('http://localhost:4028/api/deleteData',{
//     data:{
//       id: objIdToDelete,

//     },
//   });
//  };

//  const updateDb=(idToUpdate,updateToApply)=>{
// let objectToUpdate = null;
// parseInt(idToUpdate);
// data.forEach((dat) => {
//   if(dat.id == idToUpdate){
//     objectToupdate = dat._id;
//   }
  
// });

// axios.post('http://localhost:4028/api/deleteData',{
//   id: objectToUpdate,
//   update: { message: updateToApply}
// });
//  };





  
  return (
    <>
    <div>
      <ul>
        {d.length <= 0? 'No Db Entries Yet':d.map((dat)=>{
          return(<>
          
            <li key={dat.message}>
            <span>id:</span>
            {dat.id}
            <span>data:</span>
            {dat.message}
          </li>
          
          
          
             </>)
        
        })}
        <div>
          <input type="text"
          //  onChange={(e)=>{setData({message:e.target.value})}} 
           placeholder='add someting to database' />
          <button
          //  onClick={()=>{putDataToDb(data.message)}}
           >ADD</button>
        </div>
      </ul>
    </div>
  
 
    </>
  )
}

export default New;
