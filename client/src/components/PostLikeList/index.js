import Styles from './PostLikeList.module.css';
import { UserContext } from '../../Contexts/userContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostLikeList = ({ _id, setShowLikeList }) => {
    const [likeList, setLikeList] = useState([]);
    const { handleLogout } = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/actions/like/${_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setLikeList(res.data);
                // console.log(res.data)
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })
    }, [handleLogout, _id])

    const handleClickOutside = useCallback((event) => {
        if (event.target.closest('#commentForm')) return
        setShowLikeList(false)
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowLikeList])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);
    return (
        // <div className={PostLikeList.container}>
        //     {likes.map((like) => {
        //         return (
        //             <div className={PostLikeList.like}>
        //                 <img src={like.profile_pic} alt="profile_pic" />
        //                 <span>{like.username}</span>
        //             </div>
        //         )
        //     })}
        // </div>
        <div className={Styles.commentFormBack}>
            <div className={Styles.commentForm} id='commentForm'>
                <div className={Styles.commentFormHeader}>
                    <h2>Liked By</h2>
                </div>
                <div className={Styles.LikeList}>
                    {likeList.length > 0 ?
                        likeList.map((like) => {
                            return <List key={like._id} {...{ ...like }} />
                        })
                        : <h2 className={Styles.default}>No likes yet...</h2>}
                </div>
            </div>
        </div>
    )
}

const List = ({ profilePic, username, verified, name, date }) => {
    if (!profilePic) profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    return (
        <div className={Styles.postHeader}>
            <div className={Styles.postHeaderLeft}>
                <div className={Styles.leftCont}>
                    <Link to={`/profile/${username}`}><img src={profilePic} alt="profile" /></Link>
                    <div className={Styles.userDetail}>
                        <div className={Styles.postTopHeaderInfo}>
                            <Link to={`/profile/${username}`}><h5 className={Styles.postUserName}>{"@" + username}</h5></Link>
                            {verified && <MdVerified />}
                        </div>
                        <div className={Styles.postHeaderInfo}>
                            <Link to={`/profile/${username}`}><h2>{name}</h2></Link>
                            <h5>• {moment(date).fromNow()}</h5>
                        </div>
                    </div>
                </div>
                <div className={Styles.btn}>
                    <button>Follow</button>
                </div>
            </div>
        </div>
    )
}
export default PostLikeList;