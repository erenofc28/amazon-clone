import React, { useEffect, useState } from "react";
import "./home.css";
// import Prodcut from "./prodcut";
// import { useStateValue } from "../stateProvider";
import { useNavigate } from "react-router-dom";
import { CardElement,} from "@stripe/react-stripe-js";

import axios from "axios";
import { Link } from "react-router-dom";



// import { Alert } from "@material-ui/lab";
const Payment = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [{ basket }] = useStateValue();
  // const [{ address }] = useStateValue();
  const [cartFromDb, setCartFromDb] = useState([]);
  const navigate = useNavigate();
  // const elements = useElements();
  // const stripe = useStripe();
  const [itemDelete, setItemDelete] = useState([]);

  // const adddress = cartFromDb.map((dat:{address:unknown}) => {
  //   if (dat.address) {
  //     return dat.address[0];
  //   }
  // });

  // const dummy = adddress.map((da) => {
  //   return da;
  // });
// console.log('dummy',dummy);

  const cartt = cartFromDb.map((da:{products:unknown}) => {
    return da.products;
  });

  console.log(cartt);

  // const pp = basket.map((dataa: { price: unknown; }) => {
  //   return dataa.price;
  // });
  // console.log(pp)
  let ans = 0;
  // const filterd = pp.filter((dat: unknown) => {
  //   ans += Number(dat);
  //   console.log("dat", dat);
  //   //  setTotal(ans)
  //   return ans;
  // });
//  console.log(filterd);
 
  const productToBeUpdated = cartFromDb.map((dat:{_id:string}) => {
    return dat._id;
  });
console.log(productToBeUpdated);

  console.log("idddd", cartFromDb);

  const totalAmounttt = JSON.parse(localStorage.getItem("totalAmount") || '{}').total;
  const itemsCounttt = JSON.parse(localStorage.getItem("itemsCount") || '{}').count;
  console.log("count", itemsCounttt);
  console.log("total amount", totalAmounttt);

  useEffect(() => {
    const cartfromDb = axios.get("https://server-for-amazon-clone.onrender.com/orders/");

    cartfromDb.then((dat) => {
      setCartFromDb(
        dat.data.data.filter((dat: { email: unknown; products: string | unknown[]; }) => {
          if (
            JSON.parse(localStorage.getItem("userInformation")   || '{}').email ==
              dat.email &&
            dat.products.length == itemsCounttt
          ) {
            return dat;
          }
        })
      );
    });
  }, [itemsCounttt]);

  useEffect(() => {
    const call = () => {
      axios.get("https://server-for-amazon-clone.onrender.com/addCart/").then((dat) => {
        setItemDelete(
          dat.data.data.filter((dat: { email: unknown; }) => {
            if (
              JSON.parse(localStorage.getItem("userInformation")  || '{}').email ==
              dat.email
            ) {
              return dat;
            }
          })
        );
      });
    };

    call();
  }, []);

  console.log("ooo", itemDelete);

  // if(cartFromDb){
  //   console.log( cartFromDb );
  // }

  // console.log(dummy);

  const nameee = JSON.parse(localStorage.getItem("address") || '{}').name;
  const flattty = JSON.parse(localStorage.getItem("address") || '{}').flat;
  const areaaay = JSON.parse(localStorage.getItem("address") || '{}').area;
  const landmakkky = JSON.parse(localStorage.getItem("address") || '{}').landmak;
  const townnny = JSON.parse(localStorage.getItem("address") || '{}').town;
  const stateeey = JSON.parse(localStorage.getItem("address") || '{}').states;
  const phoneNumberrry = JSON.parse(
    localStorage.getItem("address") || '{}'
  ).phoneNumber;

  console.log("itenss to delete",itemDelete);
  
  const confirmPayment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    //   cartFromDb.map(()=>{
    //     axios.delete("http://localhost:3000/addCart/")


    // })

    axios.post("https://server-for-amazon-clone.onrender.com/orders/",{
      price:totalAmounttt,
      products:itemDelete,
      payment:true,
      email:JSON.parse(localStorage.getItem("userInformation") || '{}').email ,
      address:[{
        name:nameee,
        phoneNumber:phoneNumberrry,
        flat:flattty,
        area:areaaay,
      landmark:landmakkky,
        town:townnny,
        state:stateeey
  
    }]
  
    })

    itemDelete.map((dat:{_id:unknown}) => {
      axios.delete("https://server-for-amazon-clone.onrender.com/addCart/" + dat._id);
    });
    const cartfromDb = axios.get("https://server-for-amazon-clone.onrender.com/orders/");

    cartfromDb.then((dat) => {
      dat.data.data.filter((dat: { email: unknown; _id: string; }) => {
        if (
          JSON.parse(localStorage.getItem("userInformation") || '{}').email == dat.email
        ) {
          axios.put("https://server-for-amazon-clone.onrender.com/orders/" + dat._id, {
            payment: true,
          });
        }
      });
    });

    alert("Payment Successfull");
    navigate("/");
  };

  useEffect(() => {
    const callme = () => {
      const bbb = [];
      bbb.push(cartt[0]);
      const total = bbb.filter((dataa) => {
        return dataa;
      });
      // console.log(pp)
      const anss = 0;
      console.log(anss);
      const filterddd = total.filter((dat) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ans += Number(dat);
        console.log("dat", filterddd);
        //  setTotal(ans)
        return ans;
      });
    };
 
    callme();
  }, []);

  



  console.log("hi hi hi", nameee);

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

          {/* <div className="search_bar"> */}

          <input type="text" placeholder="Search" className="search_input" />
          <button className="search_btn">
            {" "}
            <img
              className="search_img"
              src="../../public/magnifying-glass-solid.png"
              alt=""
            />
          </button>
          {/* </div> */}

          <div className="right_container">
            <div className="hello">
            <a className="a_orders_1">Hello </a>  
  {JSON.parse(localStorage.getItem("userInformation") || '{}') ? (
                <a href="/" className="a_orders_2">
                  {JSON.parse(localStorage.getItem("userInformation")  || '{}').name}
                </a>
              ) : (
                <a href="/" className="a_orders_2">guest</a>
              )}
            </div>

            <div className="orders">
            <Link to="" className="a_orders_1">
                Your{" "}
              </Link>
              {JSON.parse(localStorage.getItem("userInformation") || "{}") ? (
                <Link
                  to={
                    JSON.parse(localStorage.getItem("userInformation") || "{}")
                      .name == "Guest"
                      ? "/"
                      : "/orders"
                  }
                  className="a_orders_2"
                >
                  Orders{" "}
                </Link>
              ) : (
                <Link to={"/"} className="a_orders_2">
                  Orders{" "}
                </Link>
              )}
            </div>

            <div className="basket">
              <a href=""> </a>
              <button className="basket_btn" onClick={()=>{navigate("/checkout")}}>
                <img
                  className="cart_icon"
                  src="../../public/cart-shopping-solid.png"
                  alt=""
                />
              </button>
              <p>{itemsCounttt}</p>
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
          <h2>Review Your Order</h2>

          <div className="shopping_cart">
            <h4>Shipping Address</h4>

            {
              <>
                <p>{nameee}</p>
                <p>{flattty}</p>
                <p>{areaaay}</p>
                <p>{landmakkky}</p>
                <p>
                  {townnny} {stateeey}
                </p>
                <p>{phoneNumberrry}</p>

                {/* <p>{ JSON.parse(localStorage.getItem("address")).flat}</p>
      <p>{ JSON.parse(localStorage.getItem("address"))area}</p>
      <p>{ JSON.parse(localStorage.getItem("address"))landmark}</p>
      <p>
    { JSON.parse(localStorage.getItem("address")).town} { JSON.parse(localStorage.getItem("address")).states}
   </p>
   <p>Phone : { JSON.parse(localStorage.getItem("address")).phoneNumber}</p>  */}
              </>
            }
          </div>
          <div className="shopping_cart">
            <h4>Payment Method</h4>
            <p>Card Details</p>

            <div className="inputs_for_payment_box">
              <CardElement />
              {/* <input type="text" placeholder='Card number' />
        <input type="text" placeholder='MM/YY CVC' /> */}
            </div>
          </div>

          <div className="shopping_cart">
            <h4>Your Order</h4>

            {itemDelete.length > 0 ? (
              itemDelete.map((dat:{image:string; title:string; price:number}) => {
                // console.log("data",cartt[0].length);

                return (
                  <>
                    <div className="pro">
                      <img src={dat.image} alt="" />
                      <div className="order">
                        <h4>{dat.title}</h4>
                        <div className="price_for_payment_page">
                          <p>{"         ₹" + dat.price}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div className="sub_total">
          <p>
            Subtotal ( {itemsCounttt} items ) : ₹{totalAmounttt}
          </p>
          <small>
            <input type="checkbox" />
            <span>This order contains a gift.</span>
          </small>
          <button
            onClick={(e) => {
              confirmPayment(e);
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
