import React, { useEffect, useState } from 'react'
import './final.css'
import axios from 'axios';


const Final = () => {
  const [inputs,setInputs] = useState({name:"",email:"",password:"",address:"",phoneNumber:"",AdhaarNumber:"",Education:"",KeySkills:"",Experience:""});
//   const [length,setlength] = useState({nameLength:0,emailLength:0,passwordLength:0,addressLength:0,phoneNumberLength:0,AdhaarNumberLength:0,EducationLength:0,KeySkillsLength:0,ExperienceLength:0});
//   const [formErrors,setFormErrors]=useState({name:"",email:"",password:"",address:"",phoneNumber:"",AdhaarNumber:"",Education:"",KeySkills:"",Experience:""});
// console.log(length.nameLength);
let valid = true;

const [emailCheck,setEmailCheck]= useState("");
const [passCheck,setPassCheck]=useState("");
const [pnumCheck,setPnumCheck]=useState("");
const [anumberCheck,setAnumberCheck]=useState("");
// const lengthValidation=()=>{
//     let temp =[length]; 
//     console.log(temp)
//       temp.map((pre)=>{
// if(pre.nameLength>0){
//     valid = true;
// }




// })
// }
let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
let passRegex =  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/


const checkValidation=()=>{
    let formErrors = {email:"",password:"",phoneNumber:"",AdhaarNumber:""} ;

  
          let bb = emailRegex.test(inputs.email)?"":"invalid email address"
          setEmailCheck(bb);
          if(bb!==""){
            valid=false;
          }

          let pp = passRegex.test(inputs.password)?"":"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.";

         setPassCheck(pp);
         if(pp!==""){
            valid=false;
          }
         let aa= inputs.phoneNumber.length<10  ?"invalid":"";
         console.log(aa);
         
         setPnumCheck(aa);
         if(aa!==""){
            valid=false;
          }

         let qq= inputs.AdhaarNumber.length<12 ?"invalid":""
 
        setAnumberCheck(qq)

        if(qq!==""){
            valid=false;
          }
        if(inputs.name.length<=0){
            valid=false;
        }
        if(inputs.address.length<=0){
            valid=false;
        }
        if(inputs.KeySkills.length<=0){
            valid=false;
        }
        if(inputs.Education.length<=0){
            valid=false;
        }
        if(inputs.Experience.length<=0){
            valid=false;
        }
        
    // switch(inputs){
    // case "email":
    //     formErrors.email = emailRegex.test(inputs.email)?"":"invalid email address";
    //     console.log("its me email")
    //     break;
    // case "pssword":
    //     formErrors.password = passregex.test(inputs.password)
    //     ?""
    //     :"Must Contain at least one number and one uppercase and lowercase letter ,and at least 9 characters"
    //     break;
    // case "phoneNumber":
    //     formErrors.phoneNumber = inputs.phoneNumber.length<10 
    //     ?"invalid"
    //     :""
    //     break;
    // case "AdhaarNumber":
  
    //     break;
    // }

    console.log("form email",emailCheck)
    console.log("form pass",passCheck)
    console.log("form number",pnumCheck)
    console.log("form adhaar number",anumberCheck)
    console.log("valid",valid)
   handleSubmit();
}






const handleSubmit=()=>{
    if(valid)
    {



  
            axios.post("http://localhost:3000/",
    {
        name:inputs.name,
        email:inputs.email,
        password:inputs.password,
        address:inputs.address,
        phoneNumber:inputs.phoneNumber,
       adhaarNumber:inputs.AdhaarNumber,
        education:inputs.Education,
        keySkills:inputs.KeySkills,
        experience:inputs.Experience
    })
    .then(()=>{ 
        alert("Form Successfully Submitted") 
    })
    .catch((err)=>{console.log(err)})



    }


    

}





  return (


    <>
 
      <div className="c" >

      <div className=' p-3 bg-dark text-light'>
        <h2>Know Your Customer</h2> 
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label' >Name</label>
        <input type="text" className='form-control p-2' placeholder='Name' onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,name:e.target.value }  } )
    //  setlength( (pre)=>{  return{ ...pre,nameLength:inputs.name.length+1 }  } ) 
         }}  />
     
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Email</label>
        <input type='email' className='form-control p-2' placeholder='Email' onChange={(e)=>{  setInputs((pre)=>{ return{...pre,email:e.target.value} })
        //  setlength( (pre)=>{  return{ ...pre,emailLength:inputs.email.length+1 }  } ) 
        }} />
            { <p className='m-1 text-danger'>{emailCheck}</p>}
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Password</label>
        <input type="password" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,password:e.target.value }  } )
    // setlength( (pre)=>{  return{ ...pre,passwordLength:inputs.password.length+1 }  } ) 
      }}  placeholder='Password' />
        { <p className='m-1 text-danger'>{passCheck}</p>}
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Address</label>
        <input type="text" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,address:e.target.value }  } )
    // setlength( (pre)=>{  return{ ...pre,addressLength:inputs.address.length+1 }  } ) 
      }}  placeholder='Address' />
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Phone Number</label>
        <input type="number" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,phoneNumber:e.target.value }  } )
        //  setlength( (pre)=>{  return{ ...pre,phoneNumberLength:inputs.phoneNumber.length+1 }  } ) 
           }}  placeholder='Phone Number' />
             { <p className='m-1 text-danger'>{pnumCheck}</p>}
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Adhaar Number</label>
        <input type="number" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,AdhaarNumber:e.target.value }  } )
        //  setlength( (pre)=>{  return{ ...pre,AdhaarNumberLength:inputs.AdhaarNumber.length+1 }  } ) 
          }}  placeholder='Adhaar Number' />
            { <p className='m-1 text-danger'>{anumberCheck}</p>}
       </div>

       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Education</label>
        <input type="text" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,Education:e.target.value }  } ) 
        //    setlength( (pre)=>{  return{ ...pre,EducationLength:inputs.Education.length+1 }  } ) 
            }} placeholder='Education' />
       </div>
    

  
      <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Key Skills</label>
        <input type="text" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,KeySkills:e.target.value }  } ) 
        //   setlength( (pre)=>{  return{ ...pre,KeySkillsLength:inputs.KeySkills.length+1 }  } )
           }} placeholder='Key Skills' />
       </div>
      
       <div className="row m-3 p-2">
        <label htmlFor="" className='col-form-label'>Experience(in Months)</label>
        <input type="number" className='form-control p-2'  onChange={(e)=>{  setInputs( (pre)=>{  return{ ...pre,Experience:e.target.value }  } )
        //   setlength( (pre)=>{  return{ ...pre,ExperienceLength:inputs.Experience.length+1 }  } ) 
           }} placeholder='Experience' />
       </div>

       <button onClick={checkValidation} className='btn btn-danger p-2 m-3'>Submit Information</button>
 
  </div>




      
    </>
  )
}

export default Final;
