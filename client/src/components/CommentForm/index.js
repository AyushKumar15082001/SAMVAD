import { useCallback, useEffect, useState } from 'react';
import Styles from './CommentForm.module.css';

const CommentForm = ({ handleLogout, _id, setShowCommentForm}) => {
    const [comment, setComment] = useState('');


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
                <textarea placeholder='Comment' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
        </div>
    )
}
export default CommentForm;