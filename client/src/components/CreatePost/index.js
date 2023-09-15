import Styles from './CreatePost.module.css'
import { TbPhotoFilled } from 'react-icons/tb'
import { AiFillPlayCircle } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'
import { BsCalendarWeek } from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';

const CreatePost = ({ addPost }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        addPost(text, base64);
        setText('');
        setFile(null);
        setBase64('');
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
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='Create New Post' />
                    <button type='submit'>Post</button>
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
                    <img src={base64} alt='preview' />
                    <button onClick={() => { setFile(null); setBase64(''); }}><AiOutlineClose/></button>
                    <div className={Styles.imgDetail}>
                        <span>{file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}</span>
                        <span>{size(file.size)}</span>
                    </div>
                </div>
            )
            }
        </div>
    )
}
export default CreatePost