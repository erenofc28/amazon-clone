/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import "./home.css";
// import Prodcut from "./prodcut";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const OrderDisplay = () => {
  const navigate = useNavigate();
  const [cartFromDb, setCartFromDb] = useState([]);
  const [ordersDb, setOrdersDb] = useState([]);

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const callme = () => {
      const cartfromdb = axios.get("https://server-for-amazon-clone.onrender.com/orders");
      cartfromdb.then((dat) => {
        setOrdersDb(
          dat.data.data.filter((dat:{email:string}) => {
            if (
              JSON.parse(localStorage.getItem("userInformation")|| '{}').email ==
              dat.email
            ) {
              return dat;
            }
          })
        );
      });
    };
    callme();
  }, []);

  // console.log("orders", ordersDb[0].address);

  useEffect(() => {
    const callme = () => {
      const cartfromDb = axios.get("https://server-for-amazon-clone.onrender.com/addCart/");
      cartfromDb.then((dat) => {
        setCartFromDb(
          dat.data.data.filter((dat:{email:string}) => {
            if (
              JSON.parse(localStorage.getItem("userInformation") || '{}').email ==
              dat.email
            ) {
              return dat;
            }
          })
        );
      });
    };
    callme();
  }, []);
    console.log("mah cart ", cartFromDb);

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
              {JSON.parse(localStorage.getItem("userInformation")|| '{}') ? (
                <a href="/" className="a_orders_2">
                  {JSON.parse(localStorage.getItem("userInformation")|| '{}').name}
                </a>
              ) : (
                <a href="/" className="a_orders_2">
                  guest
                </a>
              )}
            </div>

            <div className="orders">
              <a href="" className="a_orders_1">
                Your{" "}
              </a>
              <a
                href={
                  JSON.parse(localStorage.getItem("userInformation")|| '{}')
                    ? "orders"
                    : "/"
                }
                className="a_orders_2"
              >
                Orders{" "}
              </a>
            </div>
            <div className="basket">
              <a href=""> </a>
              <button
                className="basket_btn"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                <img
                  className="cart_icon"
                  src="../../public/cart-shopping-solid.png"
                  alt=""
                />
              </button>
              <p> {cartFromDb ? cartFromDb.length : 0} </p>
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
        <div className=" shopping_ccartt ">
       
          {ordersDb?ordersDb.map((dat:{
            products: any;address:any
})=>{


return(<>

      <h2>Your Orders</h2>
    
          <div className="shopping_cart">
            <h4>Shipping Address</h4>
            {
        
            
                  dat.address.map((d: {
                    phoneNumber: ReactNode;
                    state: ReactNode;
                    town: ReactNode;
                    landmark: ReactNode;
                    area: ReactNode;
                    flat: ReactNode; name: string; 
})=>{ 
                      
                 return(<>
                        <p>{d.name}</p>
                        <p>{d.flat}</p>
                        <p>{d.area}</p>
                        <p>{d.town},{d.state} </p>
                        <p>{d.phoneNumber}</p>
                 
                      </> )
                     
              })
            }
      
                {/* <p>{dat.address[0].name}</p>
                <p>{dat.address[0].flat}</p>
                <p>{dat.address[0].area}</p>
                <p>{dat.address[0].landmark}</p>
                <p>{dat.address[0].town}  {dat.address[0].state}</p>
                <p>{dat.address[0].phoneNumber}</p> */}
        
            
          </div>
          <div className="shopping_cart">
            <h4>Your Order</h4>
            
         

           {dat.products.length==1?    <div className="pro">
              <img src={ dat.products.map((d:{image:string})=>{ return (d.image)})  } alt="" />
              <div className="order">
                <h4>{dat.products[0].title}</h4>
                <div className="price_for_payment_page">
                  <p>{"₹ " + dat.products[0].price}</p>
                </div>
              </div>
            </div> : dat.products.map((d: { image: string | undefined; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string; })=>{ 
            return (<>
            
            <div className="pro">
              <img src={d.image} alt="" />
              <div className="order">
                <h4>{d.title}</h4>
                <div className="price_for_payment_page">
                  <p> {"₹ "+d.price}</p>
                </div>
              </div>
            </div>
            
                </>
              
          
              
              )
            })
           
       
            }

          
          </div>
          
       </>)
          }):<>
                <h2>Your Orders</h2>
               <p>no orders found</p>
       
          
             </>}
    
          

        </div>
      </div>
    </>
  );
};

export default OrderDisplay;
