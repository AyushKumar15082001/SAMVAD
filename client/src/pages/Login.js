import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8080/checkToken', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((res)=>{
            console.log("token is valid")
            navigate('/home');
          })
          .catch(err=>{
            console.log("token is not valid")
          })
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/login',{email,password}).then(res=>{
            // props.newTweetHandler(res.data);
            console.log(res.data);
            //setting the token in local storage
            localStorage.setItem('token',res.data.token);
            //setting the user data in local storage
            localStorage.setItem('userData',JSON.stringify(res.data.userData));
            navigate('/home');

        }).catch(err=>{
            console.log(err);
        });
        // setEmail("");
        // setPassword("");
        console.log(email,password)
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
}
export default Login;