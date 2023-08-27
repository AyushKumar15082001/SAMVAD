import React, { useState } from "react";
import axios from "axios";
const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // const res = await axios.post(
        // "http://localhost:5000/api/user/login",
        // {
        //     email,
        //     password,
        // },
        // {
        //     withCredentials: true,
        // }
        // );
    
        // console.log(res.data);
        axios.post('http://localhost:8080/auth/signup',{name,username,email,password}).then(res=>{
            // props.newTweetHandler(res.data);
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
        // setName("");
        // setUsername("");
        // setEmail("");
        // setPassword("");
        console.log(name,username,email,password)
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            
            <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};
export default Signup;