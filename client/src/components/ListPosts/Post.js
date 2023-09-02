import Styles from './Post.module.css';
import { useState } from 'react';
// import Logo from '../../logo.svg';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { FaRetweet } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';
import moment from 'moment';

const Post = ({ _id, name, username, postOwner, text, profilePic, likes, retweets, comments, date, updateHandler, deleteHandler }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={Styles.post}>
            <img src={profilePic} alt="profile" />
            <div className={Styles.postContent}>
                <div className={Styles.postHeader}>
                    <div className={Styles.postHeaderLeft}>
                        <div className={Styles.postHeaderInfo}>
                            <h2>{name}</h2>
                            <h5>{moment(date).fromNow()}</h5>
                        </div>
                        <h5 className={Styles.postUserName}>{"@" + username}</h5>
                    </div>
                    {postOwner === username && <div className={Styles.postHeaderRight}>
                        <span onClick={() => setShowMenu(!showMenu)}>...</span>
                        {showMenu && <Menu updateHandler={() => updateHandler(_id, "domething")} deleteHandler={() => deleteHandler(_id)} />}
                    </div>}
                </div>
                <div className={Styles.postBody}>
                    <p>{text}</p>
                </div>
                <div className={Styles.postButtons}>
                    <button className={Styles.postButton}>
                        <AiOutlineHeart />
                        <h5>Like ({likes})</h5>
                    </button>
                    <button className={Styles.postButton}>
                        <FaRetweet />
                        <h5>Retweet ({retweets})</h5>
                    </button>
                    <button className={Styles.postButton}>
                        <FaRegCommentDots />
                        <h5>Comment ({comments})</h5>
                    </button>
                    <button className={Styles.shareButton}>
                        <FiShare2 />
                    </button>
                </div>
            </div>
        </div>
    )
}

const Menu = ({ updateHandler, deleteHandler }) => {
    return (
        <div className={Styles.menu}>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={updateHandler}>Update</button>
        </div>
    )
}
export default Post;