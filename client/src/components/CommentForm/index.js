import { useCallback, useContext, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import Styles from './CommentForm.module.css';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../../Contexts/userContext';

const CommentForm = ({ _id, setShowCommentForm }) => {
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);

    const {username, profilePic, verified, handleLogout } = useContext(UserContext);
    console.log(_id)
    useEffect(() => {
        axios.get(`http://localhost:8080/api/actions/comment/${_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setCommentList(res.data);
                console.log(res.data)
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })
    }, [handleLogout, _id])
    const submitComment = () => {
        comment && axios.post('http://localhost:8080/api/actions/comment', { post_id: _id, comment },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setCommentList([{ ...res.data, username, profilePic, verified }, ...commentList]);
                setComment('');
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })
    }
    const deleteComment = (id) => {
        axios.delete(`http://localhost:8080/api/actions/comment/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setCommentList(commentList => commentList.filter((comment) => comment._id !== id));
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })
    }
    const handleClickOutside = useCallback((event) => {
        if (event.target.closest('#commentForm')) return
        setShowCommentForm(false)
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowCommentForm])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);


    return (
        <div className={Styles.commentFormBack}>
            <div className={Styles.commentForm} id='commentForm'>
                <div className={Styles.commentFormHeader}>
                    <h2>Comment</h2>
                </div>
                <div className={Styles.commentFormBody}>
                    <img src={profilePic} alt="profile" />
                    <textarea placeholder='Comment your views...' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button type='submit' onClick={submitComment}>Comment</button>
                </div>
                <div className={Styles.commentList}>
                    {commentList.length >0 ? commentList.map((comment) => {
                        return (
                            <CommentCard key={comment._id} {...{ ...comment, deleteComment }} />
                        )
                    }) : <h2 className={Styles.default}>No Comments...</h2>}
                </div>
            </div>
        </div>
    )
}

const CommentCard = ({ _id, comment, edited, date, name, username, profilePic, verified, deleteComment }) => {
    const [showMenu, setShowMenu] = useState(false);
    const user = useContext(UserContext);
    return (
        <>
            <div className={Styles.commentCont}>
                <div className={Styles.commentLeft}>
                    <img src={profilePic} alt="profile" />
                    <div className={Styles.userDetail}>
                        <div className={Styles.commentHeader}>
                            <h5 className={Styles.commentUserName}>{"@" + username}</h5>
                            {verified && <MdVerified />}
                            <h6>• {moment(date).fromNow()}</h6>
                            {edited && <h4>(edited)</h4>}
                        </div>

                        <div className={Styles.commentBody}>
                            <p>{comment}</p>
                        </div>
                    </div>
                </div>
                <div className={Styles.commentRight} >
                    <span onClick={() => setShowMenu(!showMenu)} >•••</span>
                    {showMenu && <Menu {...{ setShowMenu, _id, deleteComment }} isOwner={user.username === username} />}
                </div>
            </div>
        </>
    )
}

const Menu = ({ setShowMenu, _id, isOwner, deleteComment }) => {
    const handleClickOutside = useCallback((event) => {
        if (event.target.className === `${_id}_cardList`) return
        setShowMenu(false)
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowMenu, _id])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    const handleShowUpdateForm = () => { }

    return (
        <div className={Styles.menu} onClick={() => setShowMenu(false)}>
            {isOwner ?
                <>
                    <button onClick={handleShowUpdateForm} className={`${_id}_cardList`}>Update</button>
                    <button onClick={()=>deleteComment(_id)} className={`${_id}_cardList`} id={Styles.menuWarn}>Delete</button>
                </> :
                <>
                    <button className={`${_id}_cardList`}>Follow</button>
                    {/* <button className={`${_id}_cardList`}>Bookmark</button> */}
                    <button className={`${_id}_cardList`} id={Styles.menuWarn}>Report</button>
                </>
            }
        </div>
    )
}

export default CommentForm;