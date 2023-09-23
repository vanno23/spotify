import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../storedData/messageActions";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const user = useSelector((state: any) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://mern-spotifyweb.onrender.com/api/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data });
        dispatch(showSuccessMessage("Registration successful!"));
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      dispatch(showErrorMessage(errorMessage));
    }
  };

  useEffect(() => {
    if (user.user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user.user]);

  return (
    <section className="form">
      <h1>Sign Up to Spotify</h1>
      <div className="hr" />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </div>
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
          <label>Confirm Password</label>

          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">
            <span>Sign Up</span>
          </button>
        </div>
      </form>
      <div className="hr bottomHr" />
      <div className="signUpQuestion">
        <span>Already have an account?</span>
        <Link to="/login">Log in here</Link>
      </div>
    </section>
  );
};

export default Register;
