import Styles from './CreatePost.module.css'
import {TbPhotoFilled} from 'react-icons/tb'
import {AiFillPlayCircle} from 'react-icons/ai'
import {FaUpload} from 'react-icons/fa'
import {BsCalendarWeek} from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';


const CreatePost = ({name,username, newTweetHandler}) => {
    const [text,setText] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/posts',{text,name,username}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(res=>{
            // console.log(res.status);
            newTweetHandler(res.data);
        }).catch(err=>{
            if(err.response.status === 401){
                navigate('/');
            }
            console.log(err);
        })
        setText('');
    }

    return (
        <div className={Styles.createPost}>
            <div className={Styles.createPostContainer}>
                <form onSubmit={submitHandler}>
                <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder='Create New Post'/>
                <button type='submit'>Post</button>
                </form>
            </div>
            <div className={Styles.buttons}>
                <button>
                    <TbPhotoFilled className={Styles.photoIcon}/>
                    <span>Photo</span>
                </button>
                <button>
                    <AiFillPlayCircle className={Styles.photoIcon}/>
                    <span>Video</span>
                </button>
                <button>
                    <FaUpload className={Styles.photoIcon}/>
                    <span>Attachment</span>
                </button>
                <button>
                    <BsCalendarWeek className={Styles.photoIcon}/>
                    <span>Schedule</span>
                </button>
            </div>
        </div>
    )
}
export default CreatePost