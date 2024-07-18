import "./single.scss";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Single = ({ columns }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const type = location.pathname.split("/")[2];
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);
      const docSnapData = docSnap.data();

      if (docSnap.exists()) {
        switch (type) {
          case "users":
            setData({ ...docSnapData, detailName: docSnapData.displayName });
            break;
          case "products":
            setData({ ...docSnapData, detailName: docSnapData.title });
            break;
          default:
            break;
        }
      }
    };
    fetchData();
  }, []);

  const AllKeys = Object.keys(data);
  const keys = AllKeys.filter((e) => e !== "timeStamp" && e !== "img" && e !== "password" && e !== "displayName" && e !== "title" && e !== "detailName");
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Detail</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={data.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.detailName}</h1>

                {keys.map((key) => (
                  <div className="detailItem" key={key}>
                    <span className="itemKey">{key}:</span>
                    <span className="itemValue">{data[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} type="order" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Datatable columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Single;