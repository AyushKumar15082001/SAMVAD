import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Styles from "../css/Auth.module.css";
// import Logo from '../images/logo.png'
import { MdEmail } from 'react-icons/md'
import { BsFillKeyFill } from 'react-icons/bs'
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    axios.post('http://localhost:8080/api/auth/login', { email: email.toLowerCase(), password }).then(res => {
      localStorage.setItem('token', res.data);
      navigate('/home');
    }).catch(err => {
      setError(err.response.data);
    }).finally(() => {
      setLoading(false);
    })
  };
  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    setError("");
  };

  return (
    <div className={Styles.formContainer}>
      <div className={Styles.branding}>

        <h1>Welcome back!</h1>
      </div>
      <form onSubmit={handleSubmit} className={Styles.form} >
        <h1>Login</h1>
        <div className={Styles.inputContainer}>
          <MdEmail className={Styles.icon} />
          <input
            type="email"
            placeholder="email"
            autoComplete="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={Styles.inputContainer}>
          <BsFillKeyFill className={Styles.icon} />
          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            name="password"
            required
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className={Styles.button} style={loading ? {zIndex:1}:{}}>
          <button disabled={loading} type="submit">Login</button>
        </div>
        {error && <p className={Styles.error}>{error}</p>}
        <p>Don't have an account? <Link to="/signup">Create one</Link></p>
      </form>
    </div>
  );
}
export default Login;