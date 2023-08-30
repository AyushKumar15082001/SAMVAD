import React, { useState } from "react";
import Styles from "../css/Auth.module.css";
import axios from "axios";
import blob from '../images/home_blob.svg'
import blob1 from '../images/home_blob_1.svg'
import Logo from '../images/logo.png'
import { HiUser } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import { BsFillKeyFill } from 'react-icons/bs'
import { Link } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/signup', { name, username, email, password }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
        // setName("");
        // setUsername("");
        // setEmail("");
        // setPassword("");
        console.log(name, username, email, password)
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.subcontainer}>
                <div className={Styles.imgcontainer}>
                    <img src={blob} alt="blob" className={Styles.blob} />
                    <img src={blob1} alt="blob" className={Styles.blob1} />
                    {/* {blob} */}
                </div>
            </div>
            <nav>
               <Link to="/">
                <img src={Logo} alt="Logo" className={Styles.logo} />
                <span>Samvad</span>
               </Link>
            </nav>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={Styles.inputContainer}>
                        {/* <HiUser className={Styles.icon} /> */}
                        <span className={Styles.icon}>@</span>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                    <button type="submit" disabled={disabled}>Create my account</button>
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </form>
            </div>
        </div>
    );
};
export default Signup;