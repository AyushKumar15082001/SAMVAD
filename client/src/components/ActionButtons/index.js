import Styles from "./ActionButton.module.css";
import { AiOutlineHeart } from 'react-icons/ai';
// import { FiShare2 } from 'react-icons/fi';
import { LiaRetweetSolid } from 'react-icons/lia';
import { BiSolidComment } from 'react-icons/bi';
import { CiShare2 } from 'react-icons/ci';
import axios from "axios";
import { useState } from "react";
// import { FaRetweet, FaRegCommentDots } from 'react-icons/fa';

const ActionButtons = ({ retweetHandler, commentHandler, userLiked, retweeted, handleLogout, _id, setLikes }) => {
    const [liked, setLiked] = useState(userLiked);
    const likeHandler = () => {
        axios.post('http://localhost:8080/api/actions/like', { post_id: _id }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setLiked(!liked);
            setLikes((likes) => likes + (liked ? -1 : 1));
        }).catch((err) => {
            if (err.response.status === 401) {
                handleLogout()
            }
            console.log(err);
        })
    }

    return (
        <div className={Styles.actionButtons}>
            <div className={Styles.actionButton} id = {liked ? Styles.heart:''} onClick={likeHandler}>
                {/* <AiOutlineHeart className={liked ? Styles.liked : null} /> */}
                {liked ? <span >❤️</span> : <span ><AiOutlineHeart /></span>}
            </div>
            <div className={Styles.actionButton} onClick={commentHandler}>
                <BiSolidComment />
            </div>
            <div className={Styles.actionButton} onClick={retweetHandler}>
                <LiaRetweetSolid className={retweeted ? Styles.retweeted : null} />
            </div>
            <div className={Styles.actionButton}>
                <CiShare2 />
            </div>
        </div>
    )
}
export default ActionButtons;