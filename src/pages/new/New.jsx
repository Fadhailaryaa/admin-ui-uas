import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, serverTimestamp, setDoc, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!type) {
      console.error("Type is undefined");
      return;
    }

    try {
      switch (type) {
        case "users":
          const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
          await setDoc(doc(db, type, res.user.uid), {
            ...data,
            timeStamp: serverTimestamp(),
          });
          break;
        default:
          await addDoc(collection(db, type), {
            ...data,
            timeStamp: serverTimestamp(),
          });
          break;
      }
      navigate(-1);
    } catch (err) {
      console.log("Error adding document: ", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleInput} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;