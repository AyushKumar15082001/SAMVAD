import Styles from './CreatePost.module.css'
import {TbPhotoFilled} from 'react-icons/tb'
import {AiFillPlayCircle} from 'react-icons/ai'
import {FaUpload} from 'react-icons/fa'
import {BsCalendarWeek} from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'

const CreatePost = (props) => {
    const {name,userName} = props.user;
    // const [title, setTitle] = useState('')
    // const [content, setContent] = useState('')
    // const [image, setImage] = useState('')
    // const [category, setCategory] = useState('')

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const post = {
    //         title,
    //         content,
    //         image,
    //         category
    //     }
    //     console.log(post)
    //     try {
    //         const response = await fetch('http://localhost:5000/posts', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(post)
    //         })
    //         const data = await response.json()
    //         console.log(data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    const [text,setText] = useState('');
    const submitHandler = (e)=>{
        e.preventDefault();
        // console.log(text);
        //store the post in the database
        axios.post('http://localhost:8080/posts',{text,name,userName}).then(res=>{
            props.newTweetHandler(res.data);
            // console.log(res.data);
        }).catch(err=>{
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