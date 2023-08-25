import Styles from './ListPosts.module.css'
import Logo from '../../logo.svg';
import {AiOutlineHeart} from 'react-icons/ai';
import {FiShare2} from 'react-icons/fi';
import {FaRetweet} from 'react-icons/fa';
import {FaRegCommentDots} from 'react-icons/fa';
const ListPosts = ({ posts }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.post}>
                <img src={Logo} alt="profile" />
                <div className={Styles.postContent}>
                    <div className={Styles.postHeader}>
                        <div className={Styles.postHeaderLeft}>
                            <div className={Styles.postHeaderInfo}>
                                <h2>John Doe</h2>
                                <h5>3m ago</h5>
                            </div>
                            <h5 className={Styles.postUserName}>@username</h5>
                        </div>
                        <div className={Styles.postHeaderRight}>...</div>
                    </div>
                    <div className={Styles.postBody}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, S e e e e e e d d d d d d d d d d d dd d d devoluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum</p>
                    </div>
                    <div className={Styles.postButtons}>
                        <button className={Styles.postButton}>
                            <AiOutlineHeart />
                            <h5>Like (0)</h5>
                        </button>
                        <button className={Styles.postButton}>
                            <FaRetweet />
                            <h5>Retweet (0)</h5>
                        </button>
                        <button className={Styles.postButton}>
                            <FaRegCommentDots />
                            <h5>Comment (0)</h5>
                        </button>
                        <button className={Styles.shareButton}>
                            <FiShare2 />
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ListPosts;