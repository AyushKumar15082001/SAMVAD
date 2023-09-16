import { useState } from "react";
import Styles from "./UpdatePost.module.css";
import { AiOutlineClose } from 'react-icons/ai';

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
                    <button onClick={() => setShowUpdateForm(false)}>Cancel</button>

                    <h2>Update Post</h2>
                    {/* <button type='submit' onClick={() => updateHandler(updateText)}>Update</button> */}
                    <div className={Styles.button} style={loading ? { zIndex: 1 } : {}}>
                        <button type='submit' disabled={loading} onClick={() => updateHandler(updateText, base64)}>Update</button>
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
export default UpdatePost;