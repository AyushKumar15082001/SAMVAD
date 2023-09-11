import React from 'react';
import Styles from './ProfileCard.module.css';
import { Link } from 'react-router-dom';

const ProfileCard = ({ name, username, profilePic, bannerPic, followersCount, followingCount, bio }) => {
    return (
        <div className={Styles.card}>
            <div className={Styles.banner}>
                <img src={bannerPic} alt="banner" />
            </div>
            <div className={Styles.profile}>
                <div className={Styles.followersCount}>
                    <h3>{followersCount}</h3>
                    <h4>Followers</h4>
                </div>
                <div className={Styles.profileImage}>
                    <img src={profilePic} alt="profile" />
                </div>
                <div className={Styles.followingCount}>
                    <h3>{followingCount}</h3>
                    <h4>Following</h4>
                </div>
            </div>
            <div className={Styles.profileInfo}>
                <h3>{name}</h3>
                <h4>{"@" + username}</h4>
            </div>
            <div className={Styles.bio}>
                {bio}
            </div>
            <div className={Styles.myProfile}>
                <Link to="/profile">My Profile</Link>
            </div>
        </div>
    )
}
export default ProfileCard;