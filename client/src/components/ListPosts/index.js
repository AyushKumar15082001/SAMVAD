import Styles from './Post.module.css';
import { useCallback, useEffect, useState, useContext } from 'react';
import { MdVerified } from 'react-icons/md';
import UpdatePost from '../UpdatePost';
import ActionButtons from '../ActionButtons';
import { UserContext } from "../../Contexts/userContext";
import moment from 'moment';
import axios from 'axios';

const ListPost = ({ _id, name, username, text, profilePic, image, edited, verified, likeCount,commentCount, userLiked, date, setTweets }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [likes, setLikes] = useState(likeCount);
    const [comments, setComments] = useState(commentCount);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const user = useContext(UserContext);

    const handleLike = (num) => {
        setLikes(likes + num);
    }

    if (!profilePic) profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

    const handleShowUpdateForm = () => {
        setShowUpdateForm(true)
        document.addEventListener("mousedown", handleClickOutside);
    }

    const handleClickOutside = useCallback((event) => {
        console.log(event.target)
        if (event.target.closest('#updateForm')) return;
        setShowUpdateForm(false)
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowUpdateForm])

    const updateHandler = (id, text, image) => {
        setLoading(true);
        setError("");
        axios.patch('http://localhost:8080/api/posts', { id, text, image },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setShowUpdateForm(false);
                setTweets(t => t.map((tweet) => {
                    if (tweet._id === id) {
                        tweet.text = text;
                        if (image) tweet.image = image;
                        tweet.edited = true;
                        tweet.date = Date.now();
                        // return tweet;
                    }
                    return tweet;
                }));
            }).catch((err) => {
                if (err.response.status === 401) {
                    user.handleLogout()
                }
                setError(err.response.data.replace('User validation failed: ', ''));
                console.log(err);
            }).finally(() => {
                setLoading(false);
            }
            )
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8080/api/posts/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setTweets(tweets => tweets.filter((tweet) => tweet._id !== id));
            }).catch((err) => {
                if (err.response.status === 401) {
                    user.handleLogout()
                }
                console.log(err);
            })
    }

    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>
                <div className={Styles.postHeaderLeft}>
                    <img src={profilePic} alt="profile" />
                    <div className={Styles.userDetail}>
                        <div className={Styles.postTopHeaderInfo}>
                            <h5 className={Styles.postUserName}>{"@" + username}</h5>
                            {verified && <MdVerified />}
                        </div>
                        <div className={Styles.postHeaderInfo}>
                            <h2>{name}</h2>
                            <h5>• {moment(date).fromNow()}</h5>
                            {edited && <h4>(edited)</h4>}
                        </div>
                    </div>
                </div>
                <div className={Styles.postHeaderRight} >
                    <span onClick={() => setShowMenu(!showMenu)} >•••</span>
                    {showMenu && <Menu deleteHandler={() => deleteHandler(_id)} {...{ setShowMenu, _id, handleShowUpdateForm }} isOwner={user.username === username} />}
                </div>
            </div>
            <div className={Styles.postBody}>
                <p>{text}</p>
            </div>
            {image &&
                <div className={Styles.postImages}>
                    <img src={image} alt="post" />
                </div>
            }
            <ActionButtons {...{ _id, userLiked, handleLike,setComments }} />
            <div className={Styles.postStats} >
                <div className={Styles.postStatsLeft} >
                    <span>{likes}</span>
                    <span>Likes</span>
                </div>
                <div className={Styles.postStatsRight} >
                    <span>{comments}</span>
                    <span>Comments</span>
                </div>
            </div>
            {showUpdateForm && <UpdatePost updateHandler={(text, image) => { updateHandler(_id, text, image) }} {...{ text, image, loading, setShowUpdateForm, error }} />}
        </div>
    )
}

const Menu = ({ deleteHandler, setShowMenu, _id, handleShowUpdateForm, isOwner }) => {
    const handleClickOutside = useCallback((event) => {
        if (event.target.className === `${_id}_cardList`) return
        setShowMenu(false)
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowMenu, _id])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div className={Styles.menu} onClick={() => setShowMenu(false)}>
            {isOwner ?
                <>
                    <button onClick={handleShowUpdateForm} className={`${_id}_cardList`}>Update</button>
                    <button onClick={deleteHandler} className={`${_id}_cardList`} id={Styles.menuWarn}>Delete</button>
                </> :
                <>
                    <button className={`${_id}_cardList`}>Follow</button>
                    <button className={`${_id}_cardList`}>Bookmark</button>
                    <button className={`${_id}_cardList`} id={Styles.menuWarn}>Report</button>
                </>
            }
        </div>
    )
}

export default ListPost;