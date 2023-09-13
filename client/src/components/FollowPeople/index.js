import React, { useState, useEffect } from "react";
import Styles from "./FollowPeople.module.css";
const FollowPeople = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // setLoading(true);
        // axios
        //     .get("/user/recommendation")
        //     .then((res) => {
        //         setUsers(res.data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setLoading(false);
        //     });
        
;        setUsers([
            {
                _id: "1",
                name: "Anil Kumar",
                username: "anil_kumar",
            },
            {
                _id: "2",
                name: "Praveen Kumar",
                username: "praveen_kumar",
            },
            {
                _id: "3",
                name: "Shivansh Kumar",
                username: "shivansh_kumar",
            },
            {
                _id: "4",
                name: "Kamal Kumar",
                username: "kamal_kumar",
            },
            {
                _id: "5",
                name: "Rahul Kumar",
                username: "rahul_kumar",
            },
            {
                _id: "6",
                name: "Rajesh Kumar",
                username: "rajesh_kumar",
            },
            // {
            //     _id: "7",
            //     name: "Ramesh Kumar",
            //     username: "ramesh_kumar",
            // },
            // {
            //     _id: "8",
            //     name: "Raj Kumar",
            //     username: "raj_kumar",
            // },
            // {
            //     _id: "9",
            //     name: "Ramesh Kumar",
            //     username: "ramesh_kumar",
            // },
            // {
            //     _id: "10",
            //     name: "Raj Kumar",
            //     username: "raj_kumar",
            // }
        ]);

    }, []);

    return (
        <div className={Styles.follow}>
            <h4 className={Styles.follow_title}>People to follow</h4>
            {users.map((user) => <UserCard key={user._id} user={user} />)}
        </div>
    );
}

const UserCard = ({ user }) => {
    const defaultPic = "https://api.dicebear.com/7.x/avataaars/svg?seed="
    return (
        <div className={Styles.card}>
            <div className={Styles.profileContainer}>
                <div className={Styles.profile_pic}>
                    <img src={`${defaultPic}${user.name}`} alt="profile" />
                </div>
                <div className={Styles.info}>
                    <span className={Styles.name}>
                        {user.name.length > 12? user.name.slice(0, 12) + '...' : user.name }
                        </span>
                    <span className={Styles.username}>
                        @{user.username.length > 12? user.username.slice(0, 12) + '...' : user.username}
                        </span>
                </div>
            </div>
            <div className={Styles.btn}>
                <button>Follow</button>
            </div>
        </div>
    );
};

export default FollowPeople;
