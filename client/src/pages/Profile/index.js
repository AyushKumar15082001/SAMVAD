import React, { useState } from 'react';
import axios from 'axios';
import Styles from './Profile.module.css';
import { BiPencil } from 'react-icons/bi';
import {AiOutlineClose} from 'react-icons/ai';
import { useOutletContext } from 'react-router-dom';
const PersonalInfo = () => {
    const [userInputs, setUserInputs] = useState({
        bannerPic: "",
        profilePic: "",
        name: "",
        username: "",
        bio: ""
    });


    const [error, setError] = useState("");
    const [{ user, handleLogout, setUser }] = useOutletContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('uploading...');
        setError("");
        axios.patch('http://localhost:8080/api/user', { ...userInputs }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res);
                setUser(res.data);
                setUserInputs("");
            }).catch((err) => {
                setError(err.response.data);
                if (err.response.status === 401) handleLogout();
            })
    }
    const setFileToBase64 = (file, inputName) => {
       if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setUserInputs({ ...userInputs, [inputName]: reader.result })
        };
       }
        
    }
    const handleChange = (e) => {
        if (e.target.name === 'banner') setFileToBase64(e.target.files[0], 'bannerPic');
        else if (e.target.name === 'profile') setFileToBase64(e.target.files[0], 'profilePic');
        else if (e.target.name === 'name') setUserInputs({ ...userInputs, name: e.target.value});
        else if (e.target.name === 'username') setUserInputs({ ...userInputs, username: e.target.value});
        else if (e.target.name === 'bio') setUserInputs({ ...userInputs, bio: e.target.value});
    }

    // const handleDelete = () => {
    //     axios.delete('http://localhost:8080/api/user', {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }).then((res) => {
    //         console.log(res);
    //         handleLogout();
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    const handleReset = (inputName) => {
        setUserInputs({ ...userInputs, [inputName]: "" })
    }

    return (
        <>
            <div className={Styles.cont}>
                <div className={Styles.banner}>
                    <img src={userInputs.bannerPic ? userInputs.bannerPic : user.bannerPic} alt="banner" />
                    <label htmlFor='banner' className={Styles.edit1}>
                        <BiPencil />
                    </label>
                    {userInputs.bannerPic && <AiOutlineClose className={Styles.removeImg1} onClick={()=>handleReset('bannerPic')}/>}
                </div>
                <div className={Styles.profile}>
                    <div className={Styles.followersCount}>
                        <h3>{0}</h3>
                        <h4>Followers</h4>
                    </div>
                    <div className={Styles.profileImage}>
                        <img src={userInputs.profilePic ? userInputs.profilePic : user.profilePic} alt="profile" />
                    </div>
                    <div className={Styles.followingCount}>
                        <h3>{0}</h3>
                        <h4>Following</h4>
                    </div>
                    <label htmlFor='profile' className={Styles.edit2}>
                        <BiPencil />
                    </label>
                    {userInputs.profilePic && <AiOutlineClose className={Styles.removeImg2} onClick={()=>handleReset('profilePic')}/>}
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
                <input type="file" name="banner" id='banner' className={Styles.imgInput} accept="image/*" onChange={handleChange} />
                <input type="file" name="profile" id='profile' className={Styles.imgInput} accept="image/*" onChange={handleChange} />
                <input type='text' name='name' id='name' value={userInputs.name} placeholder='Name' onChange={handleChange} />
                <br />
                <input type='text' name='username' id='username' value={userInputs.username} placeholder='Username' onChange={handleChange} />
                <br />
                <input type='text' name='bio' id='bio' value={userInputs.bio} placeholder='Bio' onChange={handleChange} />
                <br />

                <button type='submit' >Upload</button>
                <h1>{error}</h1>
            </form>
        </>
    )

}
export default PersonalInfo;