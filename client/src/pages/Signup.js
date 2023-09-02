import React, { useState } from "react";
import Styles from "../css/Auth.module.css";
import axios from "axios";
// import Logo from '../images/logo.png'
import { HiUser } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import { BsFillKeyFill } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setName(name => name.trim());
        setUsername(username => username.trim());
        setEmail(email => email.trim());
        axios.post('http://localhost:8080/api/auth/signup', { name, username, email, password }).then(res => {
            navigate('/');
            console.log(res.data);
        }).catch(err => {
            setError(err.response.data.message.replace('User validation failed: ', ''));
            console.log(err.response.data);
        })
        // setName("");
        // setUsername("");
        // setEmail("");
        // setPassword("");
        setError("");
    };
    const handleChange = (e) => {
        if (e.target.name === "name") setName(e.target.value);
        if (e.target.name === "username") setUsername(e.target.value);
        if (e.target.name === "email") setEmail(e.target.value);
        if (e.target.name === "password") setPassword(e.target.value);
        setError("");
        // setDisabled(true);
    };
    return (
        <div className={Styles.formContainer}>
            <div className={Styles.branding}>

                <h1>Join Samvad.</h1>
            </div>
            <form onSubmit={handleSubmit} className={Styles.form}>
                <h1>Create your account</h1>
                <div className={Styles.inputContainer}>
                    <HiUser className={Styles.icon} />
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <span className={Styles.icon}>@</span>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <MdEmail className={Styles.icon} />
                    <input
                        type="email"
                        placeholder="email"
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
                        name="password"
                        title="Minimum six characters, at least one upper case English letter, one lower case English letter, one number and one special character"
                        required
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Create my account</button>
                {error && <p className={Styles.error}>{error}</p>}
                <p>Already have an account? <Link to="/">Login</Link></p>
            </form>
        </div>
    );
};
export default Signup;