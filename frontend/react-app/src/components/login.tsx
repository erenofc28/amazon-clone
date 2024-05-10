// import React from 'react'
// import amazon from './amazon.jpg'
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [arrayFromDb, setArrayFromDb] = useState([]);
  const [email, setEmail] = useState("");
   const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [nameCheck,setNameCheck] = useState("")
  // let [namevali,setNamevali] = useState(false);
  // let [emailvali,setEmailvali]= useState(false);
  // let [passvali,setPassvali] = useState(false);
 

  useEffect(() => {
    const callme = () => {
      const dataFromDb = axios.get("https://server-for-amazon-clone.onrender.com/signUp");
      dataFromDb.then((data) => {
        setArrayFromDb(data.data.data);
      });

      console.log("data", arrayFromDb);
    };

    callme();
  }, []);

  console.log("adad",arrayFromDb.map((d)=>{return d}))

  const handleLogin = () => {

    
  let emailvali = false;
  let passvali = false;
  let namevali = false

    arrayFromDb.map((dat) => {
     if( dat.name == name)
       
    {   setName(dat.name)
        

        setNameCheck("")
        namevali = true
     
        
        if( dat.email == email)
       
        {   setEmail(dat.email)
            
    
            setEmailCheck("")
            emailvali=true
         
             emailvali==true?setEmailCheck(""):setEmailCheck("invalid email")
          }

          if( dat.password == pass)
       
          {   setPass(dat.password)
              
      
              setPassCheck("")
              passvali=true
           
               passvali==true?setPassCheck(""):setPassCheck("invalid password")
            }
            
         
        
      }
        
      namevali==true?setNameCheck(""):setNameCheck("invalid name")
      emailvali==true?setEmailCheck(""):setEmailCheck("invalid email")
      passvali==true?setPassCheck(""):setPassCheck("invalid password")
        console.log("name",dat.name);
        

           
          
         
            
      
       
  
      
      

      // if (dat.email == email) {
      //   emailvali = true;
      //   setEmailCheck("");
           
      //   if (dat.password == pass) {
          
      //     passvali = true;
      //     setPassCheck("");
      //   } else {
      //     passvali = false;
      //     setPassCheck("invalid password");
      //   }



      // } else {
      //   emailvali = false;
      //   setEmailCheck("invalid email");
      //   setPassCheck("invalid password");
      // }
    })

    console.log(namevali, emailvali, passvali);

    if (passvali && emailvali && namevali) {
       
      localStorage.setItem(
        "userInformation",
        JSON.stringify({
          name: name,
          email: email,
        })
      );
    
      navigate("/");
    }
  };

  return (
    <>
      <div className="main_for_login">
        <div className="logo leo">
          <img
            className="amazon_img"
            src="../../public/6d5ec02e-48c7-449f-b2e2-eba0480ff9c8.jpg"
            alt=""
          />
        </div>

        <div className="dad">
          <div className="child">
            <div className="for_sign_up_form">
              <div className="sign_in">
                <h2>Sign-In</h2>
              </div>

           

              <div className="inputs">
                <label htmlFor="">name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                {nameCheck.length > 0 ? (
                  <p className="for_vali">{nameCheck}</p>
                ) : (
                  <></>
                )}

                

                <div className="pass">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="pass_input"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                {emailCheck.length > 0 ? (
                  <p className="for_vali">{emailCheck}</p>
                ) : (
                  <></>
                )}

<div className="pass">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    className="pass_input"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </div>
                {passCheck.length > 0 ? (
                  <p className="for_vali">{passCheck}</p>
                ) : (
                  <></>
                )}


                <button className="continue" onClick={handleLogin}>
                  Login
                </button>
              </div>

              <div className="policy">
                <p>
                  {" "}
                  By continuing, you agree to Erenxshopz{" "}
                  <a href=""> Conditions of Use </a> and{" "}
                  <a href="">Privacy Notice</a>{" "}
                </p>
              </div>
            </div>
            <div className="create">
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create Account in Amazon
              </button>
            </div>
          </div>
        </div>

        <div className="for_fun"></div>
      </div>
    </>
  );
};

export default Login;
