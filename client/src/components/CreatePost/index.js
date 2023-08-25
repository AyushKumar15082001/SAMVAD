import Styles from './CreatePost.module.css'
import {TbPhotoFilled} from 'react-icons/tb'
import {AiFillPlayCircle} from 'react-icons/ai'
import {FaUpload} from 'react-icons/fa'
import {BsCalendarWeek} from 'react-icons/bs'
// import { useState } from 'react'

const CreatePost = () => {
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

    return (
        <div className={Styles.createPost}>
            {/* <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Technology">Technology</option>
                    <option value="Sports">Sports</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                </select>
                <button type="submit">Create</button>
            </form> */}
            <div className={Styles.createPostContainer}>
                <input type="text"  placeholder='Create New Post'/>
                <button type='submit'>Post</button>
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