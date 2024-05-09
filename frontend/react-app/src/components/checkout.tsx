import React, { useEffect, useState } from "react";
import "./home.css";
import { useStateValue } from "../stateProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Address from "./address";

const Checkout = () => {
  const [currUser, setCurrUser] = useState([]);
  const [imp, setImp] = useState([]);
  const [cartFromDb,setCartFromDb] = useState([]);

  const deleteItem = (id,e)=>{
    e.preventDefault();
   
    axios.delete("http://localhost:3000/addCart/"+id )

    const cartFromDb = axios.get("http://localhost:3000/addCart/");
    cartFromDb.then((dat) => {
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
    
  }


  useEffect(() => {
    const callme = () => {
      const cartFromDb = axios.get("http://localhost:3000/addCart/");
      cartFromDb.then((dat) => {
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
    };
    callme();
  }, []);
  console.log("mah cart ", cartFromDb);








  useEffect(() => {
    const check = () => {
      //  const values =

      setCurrUser(JSON.parse(localStorage.getItem("userInformation")));
      console.log(
        "this is real",
        JSON.parse(localStorage.getItem("userInformation"))
      );
    };
    check();
  }, []);

  useEffect(() => {
    const addToDb = () => {
      const datFromDb = axios.get("http://localhost:3000/signUp");
      datFromDb.then((data) => {
        setImp(data.data.data);
      });

      console.log("data", currUser);
      const myArray = imp.filter((dat) => {
        if (dat.email == currUser.email) {
          return dat;
        }
      });


      console.log(myArray);

      // dispatch({
      //   type:"ADD_TO_BASKET",
      //   item:{
      //     image,
      //     title,
      //     price,
      //     ratings,
      //     id
      //   }
      // })
    };



    addToDb();
  }, []);

  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  // console.log('hi',basket.price)

  const remove = (e, id) => {
    console.log("insdie", id);
    e.preventDefault();
    dispatch({
      type: "remove_from_basket",
      id: id,
    });
  };

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

  // <Address total={"hii"} />

  return (
    <>
      <div className="main_for_nav">
        <nav>
          <div className="logo_shield">
            <img
              src="../../public/black amazon.jpg"
              className="logo_img"
              alt=""
            />
          </div>

          <input type="text" placeholder="Search" className="search_input" />
          <button className="search_btn">
            {" "}
            <img
              className="search_img"
              src="../../public/magnifying-glass-solid.png"
              alt=""
            />
          </button>

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
              <a href=""> </a>
              <button className="basket_btn">
                <img
                  className="cart_icon"
                  src="../../public/cart-shopping-solid.png"
                  alt=""
                />
              </button>
              <p> {cartFromDb?cartFromDb.length:0 } </p>
            </div>
          </div>

          <div className="demo">
            <input
              type="text"
              placeholder="Search"
              className="search_input_two"
            />
            <button className="search_btn_two">
              {" "}
              <img
                className="search_img"
                src="../../public/magnifying-glass-solid.png"
                alt=""
              />
            </button>
          </div>
        </nav>
      </div>

      <div className="main_2">
        <div className="shopping_ccart">
          <h2>Shopping Cart</h2>

          {cartFromDb?cartFromDb.map((dat) => {
              return (
                <>
                  <div className="pro">
                    <img src={dat.image} alt="" />
                    <div className="order">
                      <h4>{dat.title}</h4>
                      <p>{"₹" + dat.price}</p>
                      <button
                        onClick={(e) => {
                          remove(e, dat.id);
                          deleteItem(dat._id,e)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              );
            })
           : (
            <p className="no_item">No items found</p>
          )}
        </div>

        <div className="sub_total">
          <p>
            Subtotal ( {cartFromDb?cartFromDb.length:0 } items) : ₹{ans}
          </p>
          <small>
            <input type="checkbox" />
            <span>This order contains a gift.</span>
          </small>
          <button
            onClick={() => {
              localStorage.setItem("totalAmount",JSON.stringify({
               total:ans
              }))
              localStorage.setItem("itemsCount",JSON.stringify({
                count:cartFromDb.length
               }))
               if(cartFromDb.length>0)
               {
                navigate("address")
               }
        

            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );

};



export default Checkout;
