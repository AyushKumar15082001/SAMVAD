import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './ProfileCard.module.css';
import { BiPencil } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const ProfileCard = ({name, username, bio, profilePic, bannerPic, handleLogout, setUser, currentOwner}) => {
    if (!profilePic) profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    const [userInputs, setUserInputs] = useState({
        name: "",
        username: "",
        bio: "",
        bannerPic: "",
        profilePic: ""
    });
    const [error, setError] = useState("");
    const [textForm, setTextForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        axios.patch('http://localhost:8080/api/user', { ...userInputs }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setUser(res.data);
            setUserInputs("");
        }).catch((err) => {
            setError(err.response.data.replace('User validation failed: ', ''));
            if (err.response.status === 401) handleLogout();
        }).finally(() => {
            setLoading(false);
        })
    }
    const setFileToBase64 = (file, inputName) => {
        if (file) {
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
        else if (e.target.name === 'name') setUserInputs({ ...userInputs, name: e.target.value });
        else if (e.target.name === 'username') setUserInputs({ ...userInputs, username: e.target.value });
        else if (e.target.name === 'bio') setUserInputs({ ...userInputs, bio: e.target.value });
    }

    function isObjectEmpty(obj) {
        for (var key in obj) {
            if (obj[key] !== "")
                return false;
        }
        return true;
    }
    const handleReset = (inputName) => {
        setUserInputs({ ...userInputs, [inputName]: "" })
    }

    const handleClickOutside = (event) => {
        if (event.target.closest('#form')) {
            return;
        }
        setTextForm(false);
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className={Styles.cont}>
                <div className={Styles.banner}>
                    <img src={userInputs.bannerPic ? userInputs.bannerPic : bannerPic} alt="banner" />
                    {currentOwner && <label htmlFor='banner' className={Styles.edit1}>
                        <BiPencil />
                    </label>}
                    <input type="file" name="banner" id='banner' className={Styles.imgInput} accept="image/*" onChange={handleChange} />
                    {userInputs.bannerPic && <AiOutlineClose className={Styles.removeImg1} onClick={() => handleReset('bannerPic')} />}
                </div>
                <div className={Styles.profile}>
                    <div className={Styles.followersCount}>
                        <h3>{0}</h3>
                        <h4>Followers</h4>
                    </div>
                    <div className={Styles.profileImage}>
                        <img src={userInputs.profilePic ? userInputs.profilePic : profilePic} alt="profile" />
                    </div>
                    <div className={Styles.followingCount}>
                        <h3>{0}</h3>
                        <h4>Following</h4>
                    </div>
                    {currentOwner && <label htmlFor='profile' className={Styles.edit2}>
                        <BiPencil />
                    </label>}
                    <input type="file" name="profile" id='profile' className={Styles.imgInput} accept="image/*" onChange={handleChange} />
                    {userInputs.profilePic && <AiOutlineClose className={Styles.removeImg2} onClick={() => handleReset('profilePic')} />}
                </div>
                <div className={Styles.profileInfo}>
                    {currentOwner && <BiPencil className={Styles.edit3} onClick={() => setTextForm(t => !t)} />}
                    <h3>{userInputs.name ? userInputs.name : name}</h3>
                    <h4>{`@${userInputs.username ? userInputs.username : username}`}</h4>
                </div>
                <div className={Styles.bio}>
                    {userInputs.bio ? userInputs.bio : bio}
                </div>
                {!isObjectEmpty(userInputs) && <div className={Styles.buttons}>
                    <div className={Styles.button} >
                        <button onClick={() => { setUserInputs(''); setError('') }}>Reset</button>
                    </div>
                    <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
                        <button disabled={loading} onClick={handleSubmit}>Update</button>
                    </div>
                </div>}
                {error && <p className={Styles.error}>{error}</p>}
            </div>
            {textForm && <form className={Styles.form} id='form'>
                <input type='text' name='name' id='name' value={userInputs.name} placeholder='Name' onChange={handleChange} />
                <input type='text' name='username' id='username' value={userInputs.username} placeholder='Username' onChange={handleChange} />
                <input type='text' name='bio' id='bio' value={userInputs.bio} placeholder='Bio' onChange={handleChange} />
                <button onClick={() => setTextForm(false)}>Done</button>
            </form>
            }
        </>
    );
}
export default ProfileCard;