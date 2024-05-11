import { useEffect, useState } from "react";
import "./home.css";
import Prodcut from "./prodcut";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();

  const [myAccount, setMyAccount] = useState([]);
  const [cartFromDbb, setCartFromDbb] = useState([]);
  const [newData, setNewData] = useState([]);
  const [search, setSearch] = useState("");
  const myData = [
    {
      image: "https://m.media-amazon.com/images/I/61nxQ62qglL._AC_UL320_.jpg",
      title: "Oneplus Nord CE4",
      price: "24999",
      ratings: 4,
      id: 1,
    },
    {
      image: "https://m.media-amazon.com/images/I/71mrNn40chL._AC_UY218_.jpg",
      title: "Elden Ring (Ps4)",
      price: "3955",
      ratings: 4,
      id: 2,
    },
    {
      image: "https://m.media-amazon.com/images/I/711EqR0PGGL._AC_UY218_.jpg",
      title: "Ambrane Gaming Controller",
      price: "2160",
      ratings: 5,
      id: 3,
    },
    {
      image: "https://m.media-amazon.com/images/I/81Bnu42ZpVL._AC_UY218_.jpg",
      title: "Attack on Titan 34",
      price: "496",
      ratings: "5",
      id: 4,
    },
    {
      image: "https://m.media-amazon.com/images/I/41FWT+TZQgL._AC_UL320_.jpg",
      title: "One Piece Anime Ace Hat",
      price: "1349",
      ratings: 3,
      id: 5,
    },
    {
      image: "https://m.media-amazon.com/images/I/71cd+PYIrqL._AC_UL320_.jpg",
      title: "Amazon Basics High-Speed HDMI Cable",
      price: "179",
      ratings: 2,
      id: 6,
    },
    {
      image: "https://m.media-amazon.com/images/I/81IK2zIo0AS._AC_UY218_.jpg",
      title: "Ghost of Tsushima (PS4)",
      price: "1899 ",
      ratings: 5,
      id: 7,
    },
    {
      image: "https://m.media-amazon.com/images/I/811umGHYORL._AC_UY218_.jpg",
      title: "Spider-Man Exclusive   (PS4)",
      price: "1833",
      ratings: 3,
      id: 8,
    },
  ];

  const [myData2, setMyData2] = useState([
    {
      image: "https://m.media-amazon.com/images/I/61nxQ62qglL._AC_UL320_.jpg",
      title: "Oneplus Nord CE4",
      price: "24999",
      ratings: 4,
      id: 1,
    },
    {
      image: "https://m.media-amazon.com/images/I/71mrNn40chL._AC_UY218_.jpg",
      title: "Elden Ring (Ps4)",
      price: "3955",
      ratings: 4,
      id: 2,
    },
    {
      image: "https://m.media-amazon.com/images/I/711EqR0PGGL._AC_UY218_.jpg",
      title: "Ambrane Gaming Controller",
      price: "2160",
      ratings: 5,
      id: 3,
    },
    {
      image: "https://m.media-amazon.com/images/I/81Bnu42ZpVL._AC_UY218_.jpg",
      title: "Attack on Titan 34",
      price: "496",
      ratings: "5",
      id: 4,
    },
    {
      image: "https://m.media-amazon.com/images/I/41FWT+TZQgL._AC_UL320_.jpg",
      title: "One Piece Anime Ace Hat",
      price: "1349",
      ratings: 3,
      id: 5,
    },
    {
      image: "https://m.media-amazon.com/images/I/71cd+PYIrqL._AC_UL320_.jpg",
      title: "Amazon Basics High-Speed HDMI Cable",
      price: "179",
      ratings: 2,
      id: 6,
    },
    {
      image: "https://m.media-amazon.com/images/I/81IK2zIo0AS._AC_UY218_.jpg",
      title: "Ghost of Tsushima (PS4)",
      price: "1899 ",
      ratings: 5,
      id: 7,
    },
    {
      image: "https://m.media-amazon.com/images/I/811umGHYORL._AC_UY218_.jpg",
      title: "Spider-Man Exclusive   (PS4)",
      price: "1833",
      ratings: 3,
      id: 8,
    },
  ]);

  useEffect(() => {
    const callme = () => {
      const billy = axios.get(
        "https://server-for-amazon-clone.onrender.com/addProducts/"
      );
      billy.then((dat) => {
        setNewData(
          dat.data.data.filter((dat: { email: string }) => {
            if (
              JSON.parse(localStorage.getItem("userInformation") || "{}")
                .email == dat.email
            ) {
              return dat;
            }
          })
        );
      });
    };

    callme();

    console.log("my new data fro add", myAccount);
  
  }, [myAccount]);

  const paraHandler = (email: unknown) => {
    const cartfromDb = axios.get(
      "https://server-for-amazon-clone.onrender.com/addCart/"
    );
    cartfromDb.then((dat) => {
      setCartFromDbb(
        dat.data.data.filter((dat: { email: unknown }) => {
          if (email == dat.email) {
            return dat;
          }
        })
      );
    });

    // console.log('emailll', cartFromDbb )
  };

  useEffect(() => {
    const callme = () => {
      const dataFromDb = axios.get(
        "https://server-for-amazon-clone.onrender.com/signUp"
      );
      // console.log("dataa", dataFromDb);

      dataFromDb.then((data) => {
        const bb = [];

        bb.push(data.data.data);
        console.log(bb);
        const myacc = bb[0].filter((dat: { email: string }) => {
          if (
            JSON.parse(localStorage.getItem("userInformation") || "{}").email ==
            dat.email
          ) {
            return dat;
          }
        });

        setMyAccount(myacc[0]);

        JSON.parse(localStorage.getItem("userInformation") || "{}");
      });
    };
    // console.log("my acc ",myAccount.name);

    callme();
  }, []);

  useEffect(() => {
    const check = () => {
    
      const json = localStorage.getItem("userInformation")
      if (!json) {
        localStorage.setItem(
          "userInformation",
          JSON.stringify({
            name: "Guest",
            email: "unknown",
          })
        );
        //  navigate("/login")
        window.location.reload();
      }
    };

    check();
  }, []);

  const filt = () => {
    setMyData2(
      myData.filter((d) => {
        if (
          d.title
            .toLocaleLowerCase()
            .trim()
            .includes(search.toLocaleLowerCase().trim())
        ) {
          return d;
        }
      })
    );

    // console.log("my data  2",myData2)
  };
  // console.log("my data  2",myData2)

  return (
    <>
      <div className="main">
        <nav>
          <div className="logo_shield">
            <button
              className="addProduct_btn"
              onClick={() => {
                navigate("addProducts");
              }}
            >
              <img
                src="../../public/black amazon.jpg"
                className="logo_img"
                alt=""
              />
            </button>
          </div>

          {/* <div className="search_bar"> */}

          <input
            type="text"
            placeholder="Search"
            className="search_input"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="search_btn" onClick={filt}>
            {" "}
            <img
              className="search_img"
              src="../../public/magnifying-glass-solid.png"
              alt=""
            />
          </button>
          {/* </div> */}

          <div className="right_container">
            <div
              className={
                JSON.parse(localStorage.getItem("userInformation") || "{}")
                  ? "hello h"
                  : "hello"
              }
            >
              {/* <button className="btn_for_logging_in"> */}

              <a className="a_orders_1">Hello </a>
              {JSON.parse(localStorage.getItem("userInformation") || "{}") ? (
                <a
                  href=""
                  onClick={() => {
                    JSON.parse(localStorage.getItem("userInformation") || "{}")
                      .name == "Guest"
                      ? navigate("login")
                      : localStorage.setItem(
                          "userInformation",
                          JSON.stringify({
                            name: "Guest",
                            email: "unknown",
                          })
                        );
                  }}
                  className="a_orders_2"
                >
                  {
                    JSON.parse(localStorage.getItem("userInformation") || "{}")
                      .name
                  }
                </a>
              ) : (
                <a href="/login" className="a_orders_2">
                  guest
                </a>
              )}
            </div>

            <div className="orders">
              {/* <p className="first_p">Your</p> */}
              {/* <p className="second_p">Orders</p> */}
              <a href="" className="a_orders_1">
                Your{" "}
              </a>
              {JSON.parse(localStorage.getItem("userInformation") || "{}") ? (
                <a
                  href={
                    JSON.parse(localStorage.getItem("userInformation") || "{}")
                      .name == "Guest"
                      ? "/"
                      : "/orders"
                  }
                  className="a_orders_2"
                >
                  Orders{" "}
                </a>
              ) : (
                <a href={"/"} className="a_orders_2">
                  Orders{" "}
                </a>
              )}
            </div>

            <div className="basket">
              <a href=""> </a>
              <button
                className="basket_btn"
                onClick={() => {
                  navigate("checkout");
                }}
              >
                <img
                  className="cart_icon"
                  src="../../public/cart-shopping-solid.png"
                  alt=""
                />
              </button>
              <p>{cartFromDbb ? cartFromDbb.length : 0}</p>
            </div>
          </div>

          <div className="demo">
            <input
              type="text"
              placeholder="Search"
              className="search_input_two"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="search_btn_two" onClick={filt}>
              {" "}
              <img
                className="search_img"
                src="../../public/magnifying-glass-solid.png"
                alt=""
              />
            </button>
          </div>
        </nav>

        <div className="banner">
          <img src="../../public/banner.jpg" alt="" />
          <img src="../../public/mobile_banner.jpg" alt="" />
        </div>
        <div className="grid_body">
          {myData2?myData2.map((da,index) => {
            return (
              <>
                <Prodcut
                  key={index}
                  image={da.image}
                  title={da.title}
                  price={Number(da.price)}
                  ratings={Number(da.ratings)}
                  id={da.id}
                  paraHandler={paraHandler}
                />
              </>
            );
          }):<></>}

          {newData.length > 0 ? (
            newData.map(
              (da: {
                image: string;
                title: string;
                price: number;
                rating: number;
                _id: string;
              },index) => {
              console.log("im here");
              
                return (
                  <>
                    <Prodcut
                      key={index}
                      image={da.image}
                      title={da.title}
                      price={da.price}
                      ratings={da.rating}
                      id={Number(da._id)}
                      paraHandler={paraHandler}
                    />
                  </>
                );
              }
            )
          ) : (
          
            
            <> {console.log('nothin is here')}</>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
