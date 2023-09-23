import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../storedData/messageActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const user = useSelector((state: any) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mern-spotifyweb.onrender.com/api/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data });
        dispatch(showSuccessMessage("Logged in successfully!"));
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed!";
      dispatch(showErrorMessage(errorMessage));
    }
  };

  useEffect(() => {
    if (user.user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user.user]);

  return (
    <>
      <section className="form">
        <h1>Log in to Spotify</h1>
        <div className="hr" />
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit">
              <span>Log In</span>
            </button>
          </div>
        </form>
        <div className="hr bottomHr" />
        <div className="signUpQuestion">
          <span>Don't have an account?</span>
          <Link to="/register">Sign up for Spotify</Link>
        </div>
      </section>
    </>
  );
};

export default Login;
