import React, { useEffect, useState } from "react";
import { useStateValue } from "../stateProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [emailCheck, setEmailCheck] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [nameCheck, setNameCheck] = useState("");

  const [alreadyEmail, setAlreadyEmail] = useState("");

  const [arrayFromDb, setArrayFromDb] = useState([]);

  const navigate = useNavigate();
  const [{user},dispatch] = useStateValue();
  // const [{user}] = useStateValue();

  useEffect(() => {
    const callme = () => {
      const dataFromDb = axios.get(
        "https://server-for-amazon-clone.onrender.com/signUp"
      );
      dataFromDb.then((data) => {
        setArrayFromDb(data.data.data);
      });

      // console.log("data",arrayFromDb)
    };

    callme();
  }, []);

  let valid = false;

  const creatAccount = () => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const bb = emailRegex.test(email) ? "" : "invalid email address";
    setEmailCheck(bb);

    pass.length < 8
      ? setPassCheck("password must contain atleast 8 characters")
      : setPassCheck("");

    name.length > 8
      ? setNameCheck("maximum limit is 8 characters")
      : setNameCheck("");

    if (bb == "" && pass.length > 8 && name.length <= 8) {
      valid = true;
    }

    console.log("valii", valid);
    console.log("already", alreadyEmail);
    let forr = true;

    arrayFromDb.map((dat) => {
      if (dat.email === email) {
        valid = false;
        forr = false;
        setAlreadyEmail("email already exists,please try another one");
        console.log("dd");
      }
    });

    forr == true
      ? setAlreadyEmail("")
      : setAlreadyEmail("email already exists,please try another one");

    if (valid) {
      axios
        .post("https://server-for-amazon-clone.onrender.com/signUp", {
          name: name,
          email: email,
          password: pass,
        })
        .then(() => {
          console.log("account successfully created");
          dispatch({
            type: "User",
            name: name,
            email: email,
          });
          localStorage.setItem(
            "userInformation",
            JSON.stringify({
              name: name,
              email: email,
            })
          );

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="main_for_login">
        <div className="logo">
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
                <h2>Sign-Up</h2>
              </div>

              <div className="inputs">
                <div className="name">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    className={nameCheck.length == 0 ? "" : "danger"}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <p className="for_vali"> {nameCheck} </p>
                </div>

                <div className="email">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className={emailCheck.length == 0 ? "" : "danger"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <p className="for_vali">
                    {" "}
                    {emailCheck} {alreadyEmail}{" "}
                  </p>
                </div>

                <div className="pass">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    className={
                      passCheck.length == 0
                        ? "pass_input" + ""
                        : "danger " + "pass_input"
                    }
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                  <p className="for_vali"> {passCheck} </p>
                </div>

                <button className="login_signup" onClick={creatAccount}>
                  Create Account in Amazon
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
          </div>
        </div>

        <div className="for_fun">
          <div className="create">
            <button
              className="continue-new"
              onClick={() => {
                navigate("/login");
              }}
            >
              Back to Login
            </button>

            {/* <button >Create Account in Amazon</button> */}
          </div>
        </div>
        <div className="for_fun"></div>
      </div>
    </>
  );
}

export default SignUp;
