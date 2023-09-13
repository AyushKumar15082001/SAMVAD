import Styles from "./AuthLayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import blob from '../../../images/home_blob.svg'
import blob1 from '../../../images/home_blob_1.svg'
import { Link } from "react-router-dom";
import Logo from '../../../images/logo.png';
import axios from "axios";
import React, { useEffect } from "react";

const AuthLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem('token') && axios.get('http://localhost:8080/api/checkToken', {
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
            })
    }, [navigate]);

    return (
        <div className={Styles.container}>
            <div className={Styles.subcontainer}>
                <div className={Styles.imgcontainer}>
                    <img src={blob} alt="blob" className={Styles.blob} />
                    <img src={blob1} alt="blob" className={Styles.blob1} />
                </div>
            </div>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Logo" className={Styles.logo} />
                    <span>Samvad</span>
                </Link>
            </nav>
            <Outlet />
        </div>
    );
}
export default AuthLayout;
