import { useCallback, useContext, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import Styles from './CommentForm.module.css';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../../Contexts/userContext';
import TextareaAutosize from 'react-textarea-autosize';

const CommentForm = ({ _id, setShowCommentForm, setComments }) => {
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { username, profilePic, verified, handleLogout } = useContext(UserContext);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/actions/comment/${_id}`,
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
    const submitComment = () => {
        setLoading(true);
        comment && axios.post('http://localhost:8080/api/actions/comment', { post_id: _id, comment },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setCommentList([{ ...res.data, username, profilePic, verified }, ...commentList]);
                setComment('');
                setComments((c) => c + 1);
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            }).finally(() => {
                setLoading(false);
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
                setComments((c) => c - 1);
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
                    <div className={Styles.commentText}>
                        <TextareaAutosize placeholder='Comment your views...' value={comment} onChange={(e) => setComment(e.target.value.substring(0, 350))} autoFocus />
                        <div className={Styles.lengthCont}>
                            {comment && <span>{comment.length}/350</span>}
                            {comment && <div className={Styles.buttons}>
                                <button type='submit' onClick={() => setComment('')}>Cancel</button>
                                <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
                                    <button type='submit' disabled={loading} onClick={submitComment}>Comment</button>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className={Styles.commentList}>
                    {commentList.length > 0 ? commentList.map((comment) => {
                        return (
                            <CommentCard key={comment._id} {...{ ...comment, deleteComment, setCommentList }} />
                        )
                    }) : <h2 className={Styles.default}>No Comments...</h2>}
                </div>
            </div>
        </div>
    )
}

const CommentCard = ({ _id, comment, edited, date, username, profilePic, verified, deleteComment, setCommentList }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editedText, setEditedText] = useState(comment);
    const [loading, setLoading] = useState(false);
    const user = useContext(UserContext);

    const handleCancel = () => {
        setShowEdit(false);
        setEditedText(comment);
    }

    const updateComment = (id, comment) => {
        setLoading(true);
        comment && axios.patch('http://localhost:8080/api/actions/comment', { comment_id: id, comment },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }

            }).then((res) => {
                setCommentList(commentList => commentList.map((item) => {
                    if (item._id === id) {
                        return { ...item, comment, edited: true, date: Date.now() }
                    }
                    return item;
                }));
            }).catch((err) => {
                if (err.response.status === 401) {
                    user.handleLogout()
                }
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                setShowEdit(false);
            })
    }

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
                            {showEdit ? <div className={Styles.commentText}>
                                <TextareaAutosize placeholder='edit your comments...' value={editedText} onChange={(e) => setEditedText(e.target.value.substring(0, 350))} autoFocus />
                                <div className={Styles.lengthCont}>
                                    <span>{editedText.length}/350</span>
                                    {<div className={Styles.buttons}>
                                        <button type='submit' onClick={handleCancel}>Cancel</button>
                                        <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
                                            <button type='submit' disabled={loading} onClick={() => updateComment(_id, editedText)}>Update</button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                                : <p >{comment}</p>}

                        </div>
                    </div>
                </div>
                <div className={Styles.commentRight} >
                    <span onClick={() => setShowMenu(!showMenu)} >•••</span>
                    {showMenu && <Menu {...{ setShowMenu, _id, deleteComment, updateComment, setShowEdit }} isOwner={user.username === username} />}
                </div>
            </div>
        </>
    )
}

const Menu = ({ setShowMenu, _id, isOwner, deleteComment, updateComment, setShowEdit }) => {
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
                    <button onClick={() => setShowEdit(true)} className={`${_id}_cardList`}>Update</button>
                    <button onClick={() => deleteComment(_id)} className={`${_id}_cardList`} id={Styles.menuWarn}>Delete</button>
                </> :
                <>
                    <button className={`${_id}_cardList`}>Follow</button>
                    <button className={`${_id}_cardList`} id={Styles.menuWarn}>Report</button>
                </>
            }
        </div>
    )
}

export default CommentForm;