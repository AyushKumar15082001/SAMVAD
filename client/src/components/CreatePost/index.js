import Styles from './CreatePost.module.css'
import { TbPhotoFilled } from 'react-icons/tb'
import { AiFillPlayCircle } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'
import { BsCalendarWeek } from 'react-icons/bs'
import { useState } from 'react';

const CreatePost = ({ addPost }) => {
    const [text, setText] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        addPost(text);
        setText('');
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
                <button>
                    <TbPhotoFilled className={Styles.photoIcon} />
                    <span>Photo</span>
                </button>
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
        </div>
    )
}
export default CreatePost