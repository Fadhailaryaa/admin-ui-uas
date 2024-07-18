import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  let data;

  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query: "users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "View all products",
        query: "products",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "category":
      data = {
        title: "CATEGORIES",
        isMoney: false,
        link: "View all categories",
        query: "categories",
        icon: (
          <CategoryIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;
    default:
      console.error("Invalid widget type:", type);
      break;
  }

  useEffect(() => {
    if (!data || !data.query) {
      console.error("Query is undefined");
      return;
    }

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, data.query));
        setAmount(querySnapshot.docs.length);
        setDiff(100); // Example percentage change
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">
          {data.isMoney && "$"} {amount}
        </div>
        <div className="link">{data.link}</div>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? "up" : "down"}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;