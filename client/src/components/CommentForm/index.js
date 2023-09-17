import { useCallback, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import Styles from './CommentForm.module.css';
import axios from 'axios';
import moment from 'moment';

const CommentForm = ({ handleLogout, _id, setShowCommentForm, name, username, profilePic, verified }) => {
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/actions/comment', { post_id: _id },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setCommentList(res.data);
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })
    }, [handleLogout, _id])
    const submitPost = () => {
        comment && axios.post('http://localhost:8080/api/actions/comment', { post_id: _id, comment },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setComment('');
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
        // <div className={Styles.commentForm}>
        //     <div className={Styles.commentFormHeader}>
        //         <h2>Comment</h2>
        //         <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
        //             <button type='submit' disabled={loading} onClick={commentHandler}>Comment</button>
        //         </div>
        //     </div>
        //     <div className={Styles.commentFormBody}>
        //         <textarea placeholder='Comment' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        //     </div>
        // </div>
        <div className={Styles.commentFormBack}>
            <div className={Styles.commentForm} id='commentForm'>
                {/* <div className={Styles.postHeaderLeft}>
                    <img src={profilePic} alt="profile" />
                    <div className={Styles.userDetail}>
                    <div className={Styles.postTopHeaderInfo}>
                    <h5 className={Styles.postUserName}>{"@" + username}</h5>
                    {verified && <MdVerified />}
                        </div>
                        <div className={Styles.postHeaderInfo}>
                            <h2>{name}</h2>
                            </div>
                            </div>
                        </div> */}
                <div className={Styles.commentFormHeader}>
                    <h2>Comment</h2>
                </div>
                <div className={Styles.commentFormBody}>
                    <img src={profilePic} alt="profile" />
                    <textarea placeholder='Comment your views...' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button type='submit' onClick={submitPost}>Comment</button>
                </div>
                <div className={Styles.commentList}>
                    {commentList && commentList.map((comment) => {
                        return (
                            // <div className={Styles.comment}>
                            //     <img src={comment.profilePic} alt="profile" />
                            //     <div className={Styles.commentBody}>
                            //         <div className={Styles.commentHeader}>
                            //             <h2>{comment.name}</h2>
                            //             <h5>{'@' + comment.username}</h5>
                            //         </div>
                            //         <div className={Styles.commentText}>
                            //             <p>{comment.comment}</p>
                            //         </div>
                            //     </div>
                            // </div>
                            <CommentCard{...{commentList}}/>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

const CommentCard = ({_id, comment, edited, date, name, username, profilePic, verified}) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
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
                    {/* {showMenu && <Menu {...{ setShowMenu, _id }} isOwner={postOwner === username} />} */}
                </div>
            </div>
            <div className={Styles.postBody}>
                <p>{comment}</p>
            </div>
        </>
    )
}

const Menu = ({ setShowMenu, _id, isOwner }) => {
    const handleClickOutside = useCallback((event) => {
        if (event.target.className === `${_id}_cardList`) return
        setShowMenu(false)
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowMenu, _id])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    const deleteHandler = () => {}
    const handleShowUpdateForm = () => {}

    return (
        <div className={Styles.menu} onClick={() => setShowMenu(false)}>
            {isOwner ?
                <>
                    <button onClick={handleShowUpdateForm} className={`${_id}_cardList`}>Update</button>
                    <button onClick={deleteHandler} className={`${_id}_cardList`} id={Styles.menuWarn}>Delete</button>
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