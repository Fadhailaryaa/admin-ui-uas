import "./login.scss";
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);
  const { darkMode, dispatch: darkModeDispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Login</button>
        {error && <span>{error}</span>}
        <div className="theme-toggle" onClick={() => darkModeDispatch({ type: "TOGGLE" })}>
          {darkMode ? "light" : "dark"}
        </div>
      </form>
    </div>
  );
};

export default Login;