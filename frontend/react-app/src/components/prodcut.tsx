import axios from "axios";
import { useStateValue } from "../stateProvider";
import "./product.css";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";

const Prodcut = ({ image, title, price, ratings, id,paraHandler }) => {

  const [{ basket }, dispatch] = useStateValue();

  const [{ user }] = useStateValue();
  const [currUser, setCurrUser] = useState([]);
  const [_id, set_Id] = useState("");
  const [ cartFromDb,setCartFromDb] = useState([])

  useEffect(() => {
    const callme = () => {
      setCurrUser(JSON.parse(localStorage.getItem("userInformation")));
      set_Id(JSON.parse(localStorage.getItem("_id")));
      paraHandler(  JSON.parse(localStorage.getItem("userInformation")).email  )
    };

    callme();
  }, []);


  const addToDb = () => {
console.log("curr user",currUser.email);

  axios.post("https://server-for-amazon-clone.onrender.com/addCart/",{
    email:currUser.email,
    title:title,
    image:image,
    price:price
  })
  .then(()=>{console.log("successfully added");
  })




    
      const cartfromDb = axios.get("https://server-for-amazon-clone.onrender.com/addCart/");
      cartfromDb.then((dat) => {
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

    
    paraHandler(  JSON.parse(localStorage.getItem("userInformation")).email  )

  
  console.log("mah cart " ,cartFromDb   );

  


  };

  return (
    <>
      <div className="container">
        <img src={image} alt="" />

        <div className="description">
          <h5>{title}</h5>
          <Rating
            name="rating-read"
            defaultValue={ratings}
            precision={0.5}
            readOnly
          />
          <p>{"₹" + price}</p>
          <button
            onClick={() => {
              JSON.parse(localStorage.getItem("userInformation")).name=="Guest"?alert("Please log in to continue"): addToDb();
          
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Prodcut;
