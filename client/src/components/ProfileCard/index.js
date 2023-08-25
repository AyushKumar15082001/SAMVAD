import React from 'react';
import Styles from './ProfileCard.module.css';
import Logo from '../../logo.svg';
const ProfileCard = ({firstName, lastName, userName, followersCount, followingCount}) => {
    return (
        <div className={Styles.card}>
            <div className={Styles.banner}>
            </div>
            <div className={Styles.profile}>
                <div className={Styles.profileImage}>
                    <img src={Logo} alt="profile" />
                </div>
                <div className={Styles.profileInfo}>
                    <h3>{firstName + " " + lastName}</h3>
                    <h4>{"@"+userName}</h4>
                </div>
            </div>
            <div className={Styles.profileStats}>
                <div className={Styles.followingCount}>
                    <h3>{followingCount}</h3>
                    <h4>Following</h4>
                </div>
                <div className={Styles.followersCount}>
                    <h3>{followersCount}</h3>
                    <h4>Followers</h4>
                </div>
            </div>
            <div className={Styles.FindPeople}>
                <h4>Find new People</h4>
            </div>
        </div>
    )
}
export default ProfileCard;