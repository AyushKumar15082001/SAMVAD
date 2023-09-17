import axios from "axios";
import Navbar from "../../Navbar";
import Styles from "./PageLayout.module.css";
import Menu from "../../Menu";
import Credits from "../../Credits";
import FollowPeople from "../../FollowPeople";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Contexts/userContext";

const PageLayout = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    // user.profilePic = user.profilePic ? user.profilePic : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
    if (!user.profilePic) user.profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/');
    }, [navigate])

    useEffect(() => {
        axios.get('http://localhost:8080/api/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUser(res.data);
                // console.log(res.data);
            }
            ).catch(err => {
                if (err.response.status === 401) {
                    handleLogout()
                }
            })
    }, [handleLogout])

    return (
        <div className={Styles.App}>
            <UserContext.Provider value={{ ...user, setUser, handleLogout }}>
                <Navbar />
                <div className={Styles.container}>
                    <div>
                        <Menu />
                        <Credits />
                    </div>
                    <div>
                        <Outlet context={[{ handleLogout, user, setUser }]} />
                    </div>
                    <FollowPeople />
                </div>
            </UserContext.Provider>
        </div>
    )
}
export default PageLayout;