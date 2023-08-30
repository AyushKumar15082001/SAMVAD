import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Styles from "../css/Auth.module.css";
import Logo from '../images/logo.png'
import { MdEmail } from 'react-icons/md'
import { BsFillKeyFill } from 'react-icons/bs'
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') && axios.get('http://localhost:8080/checkToken', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log("token is valid")
        navigate('/home');
      })
      .catch(err => {
        console.log("token is not valid")
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      })
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', { email, password }).then(res => {
      // props.newTweetHandler(res.data);
      // console.log(res.data);
      //setting the token in local storage
      localStorage.setItem('token', res.data.token);
      //setting the user data in local storage
      localStorage.setItem('userData', JSON.stringify(res.data.userData));
      navigate('/home');

    }).catch(err => {
      console.log(err);
    });
    // setEmail("");
    // setPassword("");
    console.log(email, password)
  };

  return (
    <>
      <nav>
        <Link to="/">
          <img src={Logo} alt="Logo" className={Styles.logo} />
          <span>Samvad</span>
        </Link>
      </nav>
      <div className={Styles.formContainer}>
        <div className={Styles.branding}>

          <h1>Welcome back!</h1>
        </div>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <h1>Login</h1>
          <div className={Styles.inputContainer}>
            <MdEmail className={Styles.icon} />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={Styles.inputContainer}>
            <BsFillKeyFill className={Styles.icon} />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to="/signup">Create one</Link></p>
        </form>
      </div>
    </>
  );
}
export default Login;