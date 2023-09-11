import Styles from './Post.module.css';
import { useEffect, useState } from 'react';
// import Logo from '../../logo.svg';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { FaRetweet } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';
import moment from 'moment';

const Post = ({ _id, name, username, postOwner, text, profilePic, image, likes, retweets, comments, date, updateHandler, deleteHandler }) => {
    const [showMenu, setShowMenu] = useState(false);
    if (!profilePic) profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

    const handleClickOutside = (event) => {
        if (event.target.closest('#cardList')) {
            return;
        }
        setShowMenu(false);
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>
                <div className={Styles.postHeaderLeft}>
                    <img src={profilePic} alt="profile" />
                    <div className={Styles.userDetail}>
                        <h5 className={Styles.postUserName}>{"@" + username}</h5>
                        <div className={Styles.postHeaderInfo}>
                            <h2>{name}</h2>
                            <h5>• {moment(date).fromNow()}</h5>
                        </div>
                    </div>
                </div>
                {postOwner === username &&
                    <div className={Styles.postHeaderRight} id='cardList' style={showMenu ? { transform: 'translate(109px, 49.5px)' } : {}} >
                        <span onClick={() => setShowMenu(!showMenu)}>•••</span>
                        {showMenu && <Menu updateHandler={() => updateHandler(_id, "updated")} deleteHandler={() => deleteHandler(_id)} {...{ setShowMenu }} />}
                    </div>}
            </div>
            <div className={Styles.postBody}>
                <p>{text}</p>
            </div>
            {image && <div className={Styles.postImages}>
                <img src={image} alt="post" />
            </div>}
            <div className={Styles.postButtons}>
                <div className={Styles.postButton}>
                    <AiOutlineHeart />
                    <h5>{likes}</h5>
                </div>
                <div className={Styles.postButton}>
                    <FaRetweet />
                    <h5>{retweets}</h5>
                </div>
                <div className={Styles.postButton}>
                    <FaRegCommentDots />
                    <h5>{comments}</h5>
                </div>
                <div className={Styles.postButton}>
                    <FiShare2 />
                </div>
            </div>
        </div>
    )
}

const Menu = ({ updateHandler, deleteHandler, setShowMenu }) => {
    return (
        <div className={Styles.menu} onClick={() => setShowMenu(false)}>
            <button onClick={updateHandler}>Update</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}
export default Post;