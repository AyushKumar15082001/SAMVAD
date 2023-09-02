import React, { useState } from 'react';
import axios from 'axios';
const {useNavigate} = require('react-router-dom');

const Profile = () => {
    const [bannerBase64, setBannerBase64] = useState("");
    const [profileBase64, setProfileBase64] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('uploading...');
        setError("uploading...");
        axios.patch('http://localhost:8080/api/user', { bannerPic: bannerBase64, profilePic: profileBase64, name, username, bio }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res);
                setError("uploaded");
            }).catch((err) => {
                setError(err.response.data);
                if (err.response.status === 401) navigate('/');
                console.log(err);
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
            <div>
                <h1>Profile</h1>
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
                </form>
                <h1>{error}</h1>
                <button onClick={handleDelete}>delete profile</button>
            </div>
        )
    }
    export default Profile;