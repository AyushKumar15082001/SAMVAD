import React, { useState } from 'react';
import axios from 'axios';
import Styles from './Profile.module.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
const PersonalInfo = () => {
    const [bannerBase64, setBannerBase64] = useState("");
    const [profileBase64, setProfileBase64] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [{ user, handleLogout }] = useOutletContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('uploading...');
        setError("");
        axios.patch('http://localhost:8080/api/user', { bannerPic: bannerBase64, profilePic: profileBase64, name, username, bio }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res);
                setError("");
            }).catch((err) => {
                setError(err.response.data);
                if (err.response.status === 401) handleLogout();
            })
    }
    const setFileToBase64 = (file, setFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(reader.result);
        };
    }
    const handleChange = (e) => {
        if (e.target.name === 'banner') setFileToBase64(e.target.files[0], setBannerBase64);
        else if (e.target.name === 'profile') setFileToBase64(e.target.files[0], setProfileBase64);
        else if (e.target.name === 'name') setName(e.target.value);
        else if (e.target.name === 'username') setUsername(e.target.value);
        else if (e.target.name === 'bio') setBio(e.target.value);
    }

    const handleDelete = () => {
        axios.delete('http://localhost:8080/api/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log(res);
            localStorage.removeItem('token');
            navigate('/');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className={Styles.cont}>
                <div className={Styles.banner}>
                    <img src={user.bannerPic} alt="banner" />
                </div>
                <div className={Styles.profile}>
                    <div className={Styles.followersCount}>
                        <h3>{0}</h3>
                        <h4>Followers</h4>
                    </div>
                    <div className={Styles.profileImage}>
                        <img src={user.profilePic} alt="profile" />
                    </div>
                    <div className={Styles.followingCount}>
                        <h3>{0}</h3>
                        <h4>Following</h4>
                    </div>
                </div>
                <div className={Styles.profileInfo}>
                    <h3>{user.name}</h3>
                    <h4>{"@" + user.username}</h4>
                </div>
                <div className={Styles.bio}>
                    {user.bio}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="banner" id='banner' accept="image/*" onChange={handleChange} />
                <label htmlFor="banner">Choose a file for banner</label>
                <br />
                <input type="file" name="profile" id='profile' accept="image/*" onChange={handleChange} />
                <label htmlFor="profile">Choose a file for profile</label>
                <br />
                <input type='text' name='name' id='name' value={name} placeholder='Name' onChange={handleChange} />
                <br />
                <input type='text' name='username' id='username' value={username} placeholder='Username' onChange={handleChange} />
                <br />
                <input type='text' name='bio' id='bio' value={bio} placeholder='Bio' onChange={handleChange} />
                <br />

                <button type='submit' >Upload</button>
                <h1>{error}</h1>
            </form>
        </>
    )

}
export default PersonalInfo;