import Styles from './Post.module.css';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { FaRetweet } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import moment from 'moment';
import axios from 'axios';

const Post = ({ _id, name, username, postOwner, text, profilePic, image, likes, retweets, comments, date, deleteHandler, handleLogout, setTweets }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
                        if(image)tweet.image = image;
                        tweet.date = Date.now();
                        return tweet;
                    }
                    return tweet;
                }));
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                setError(err.response.data.replace('User validation failed: ', ''));
                console.log(err);
            }).finally(() => {
                setLoading(false);
            }
        )
    }

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
                    <div className={Styles.postHeaderRight} style={showMenu ? { transform: 'translate(108.4px, 42.8px)' } : {}} >
                        <span onClick={() => setShowMenu(!showMenu)} >•••</span>
                        {showMenu && <Menu deleteHandler={() => deleteHandler(_id)} {...{ setShowMenu, _id, handleShowUpdateForm }} />}
                    </div>
                }
            </div>
            <div className={Styles.postBody}>
                <p>{text}</p>
            </div>
            {image &&
                <div className={Styles.postImages}>
                    <img src={image} alt="post" />
                </div>
            }
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
            {showUpdateForm && <UpdatePost updateHandler={(text, image) => { updateHandler(_id, text, image) }} {...{ text, image, loading, setShowUpdateForm, error }} />}
        </div>
    )
}

const Menu = ({ deleteHandler, setShowMenu, _id, handleShowUpdateForm }) => {
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
            <button onClick={handleShowUpdateForm} className={`${_id}_cardList`}>Update</button>
            <button onClick={deleteHandler} className={`${_id}_cardList`}>Delete</button>
        </div>
    )
}

const UpdatePost = ({ image, text, updateHandler, loading, setShowUpdateForm, error }) => {
    const [updateText, setUpdateText] = useState(text);
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');

    const size = (size) => {
        if (size < 1024) return size + 'B';
        size /= 1024;
        if (size < 1024) return size.toFixed(2) + 'KB';
        size /= 1024;
        if (size < 1024) return size.toFixed(2) + 'MB';
        size /= 1024;
        if (size < 1024) return size.toFixed(2) + 'GB';
        size /= 1024;
        return size.toFixed(2) + 'TB';
    }
    const handleChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setBase64(reader.result);
            }
        }
    }

    return (
        <div className={Styles.updateFormBack}>
            <div className={Styles.updateForm} id='updateForm'>
                <div className={Styles.updateFormHeader}>
                    <button onClick={()=>setShowUpdateForm(false)}>Cancel</button>

                    <h2>Update Post</h2>
                    {/* <button type='submit' onClick={() => updateHandler(updateText)}>Update</button> */}
                    <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
                        <button type='submit' disabled={loading} onClick={() => updateHandler(updateText,base64)}>Update</button>
                    </div>
                </div>
                <div className={Styles.updateFormBody}>
                    <div className={Styles.postImg}>

                        {
                            base64 ? <div>
                                <img src={base64} alt="post" />
                                <button onClick={() => { setFile(null); setBase64(''); }}><AiOutlineClose /></button>
                                <div className={Styles.imgDetail}>
                                    <span>{file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}</span>
                                    <span>{size(file.size)}</span>
                                </div>
                            </div> : image && <img src={image} alt="post" />
                        }

                    </div>
                    <div className={Styles.postCont}>
                        <textarea placeholder="Update your post" value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
                        <label htmlFor="updateImg">Choose Image</label>
                        <input type="file" name="updateImg" id='updateImg' accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
                    </div>
                </div>
                {error && <p className={Styles.error}>{error}</p>}
            </div>
        </div>
    )
}

export default Post;