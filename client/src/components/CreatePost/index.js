import Styles from './CreatePost.module.css'
import { TbPhotoFilled } from 'react-icons/tb'
import { AiFillPlayCircle } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'
import { BsCalendarWeek } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { useState, useContext } from 'react';
import { UserContext } from "../../Contexts/userContext";
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

const CreatePost = ({ setTweets }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, username, profilePic, verified, handleLogout } = useContext(UserContext);

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('/api/posts', { text, image: base64 }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setTweets(t => [{ ...res.data, name, username, profilePic, verified }, ...t]);
                setText('');
                setFile(null);
                setBase64('');
            })
            .catch(err => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            }).finally(() => setLoading(false));

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

    return (
        <div className={Styles.createPost}>
            <div className={Styles.createPostContainer}>
                <form onSubmit={submitHandler}>
                    <img src={profilePic} alt="profile" />
                    <div className={Styles.postText}>
                        <TextareaAutosize placeholder='Create New Post...' value={text} onChange={(e) => setText(e.target.value.substring(0, 350))} autoFocus />
                    </div>
                </form>
            </div>
            <div className={Styles.buttons}>
                <label htmlFor="profile">
                    <TbPhotoFilled className={Styles.photoIcon} />
                    <span>Photo</span>
                </label>
                <input type="file" name="profile" id='profile' accept="image/*" onChange={handleChange} className={Styles.buttonInput} />
                <button>
                    <AiFillPlayCircle className={Styles.photoIcon} />
                    <span>Video</span>
                </button>
                <button>
                    <FaUpload className={Styles.photoIcon} />
                    <span>Attachment</span>
                </button>
                <button>
                    <BsCalendarWeek className={Styles.photoIcon} />
                    <span>Schedule</span>
                </button>
            </div>
            {file && (
                <div className={Styles.canvas}>
                    <div>
                        <img src={base64} alt='preview' />
                        <button onClick={() => { setFile(null); setBase64(''); }}><AiOutlineClose /></button>
                    </div>
                    <div className={Styles.imgDetail}>
                        <span>{file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}</span>
                        <span>{size(file.size)}</span>
                    </div>
                </div>
            )
            }
            <div className={Styles.lengthCont}>
                {text && <span>{text.length}/350</span>}
                {text && <div className={Styles.submitButtons}>
                    <button type="reset" onClick={() => setText('')}>Cancel</button>
                    <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
                        <button type='submit' disabled={loading} onClick={submitHandler}>Comment</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default CreatePost;