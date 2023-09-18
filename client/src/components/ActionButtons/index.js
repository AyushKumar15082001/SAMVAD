import Styles from "./ActionButton.module.css";
import { AiOutlineHeart } from 'react-icons/ai';
import { LiaRetweetSolid } from 'react-icons/lia';
import { BiSolidComment } from 'react-icons/bi';
import { CiShare2 } from 'react-icons/ci';
import CommentForm from "../CommentForm";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/userContext";
// import { FaRetweet, FaRegCommentDots } from 'react-icons/fa';

const ActionButtons = ({ userLiked, _id, handleLike, setComments}) => {
    const [liked, setLiked] = useState(userLiked);
    const [retweeted, setRetweeted] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);

    const {handleLogout} = useContext(UserContext);

    const likeHandler = () => {
        axios.post('http://localhost:8080/api/actions/like', { post_id: _id }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setLiked(!liked);
            handleLike(liked ? -1 : 1);
            // setLikes(likes + (liked ? -1 : 1));
        }).catch((err) => {
            if (err.response.status === 401) {
                handleLogout()
            }
            console.log(err);
        })
    }

    const retweetHandler = ()=>{
        setRetweeted(!retweeted);
    }
    return (
        <div className={Styles.actionButtons}>
            <div className={Styles.actionButton} id={liked ? Styles.heart : ''} onClick={likeHandler}>
                {liked ? <span >❤️</span> : <span ><AiOutlineHeart /></span>}
            </div>
            <div className={Styles.actionButton} onClick={()=>setShowCommentForm(true)}>
                <BiSolidComment />
            </div>
            <div className={Styles.actionButton} onClick={retweetHandler}>
                <LiaRetweetSolid className={retweeted ? Styles.retweeted : null} />
            </div>
            <div className={Styles.actionButton}>
                <CiShare2 />
            </div>
            {showCommentForm && <CommentForm setShowCommentForm={setShowCommentForm} {...{_id, setComments}}/>}
        </div>
    )
}
export default ActionButtons;