import Styles from './ListPosts.module.css'
import Logo from '../../logo.svg';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { FaRetweet } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ListPosts = ({newTweet}) => {
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/posts').then(res=>{
            // console.log(res.data);
            setTweets(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    useEffect(() => {
        // if(newTweet){
            setTweets(t=>[...t,newTweet]);
        // }
        console.log(newTweet);
    },[newTweet]);
    // if(newTweet)setTweets(t => [...t, newTweet]);
    return (
        <div className={Styles.container}>
            {/* <Post />
            <Post />
            <Post /> */}
            {tweets.map((item, index)=>{
                return <Post key={index} {...item} />
            })}
        </div>
    )
}
const Post = ({name, userName, text, likes, retweets, comments, date}) => {
    return (
        <div className={Styles.post}>
            <img src={Logo} alt="profile" />
            <div className={Styles.postContent}>
                <div className={Styles.postHeader}>
                    <div className={Styles.postHeaderLeft}>
                        <div className={Styles.postHeaderInfo}>
                            <h2>{name}</h2>
                            {/* <h5>3m ago</h5> */}
                            <h5>{moment(date).fromNow()}</h5>
                        </div>
                        <h5 className={Styles.postUserName}>{"@" + userName}</h5>
                    </div>
                    <div className={Styles.postHeaderRight}>...</div>
                </div>
                <div className={Styles.postBody}>
                    <p>{text}</p>
                </div>
                <div className={Styles.postButtons}>
                    <button className={Styles.postButton}>
                        <AiOutlineHeart />
                        <h5>Like ({likes})</h5>
                    </button>
                    <button className={Styles.postButton}>
                        <FaRetweet />
                        <h5>Retweet ({retweets})</h5>
                    </button>
                    <button className={Styles.postButton}>
                        <FaRegCommentDots />
                        <h5>Comment ({comments})</h5>
                    </button>
                    <button className={Styles.shareButton}>
                        <FiShare2 />
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ListPosts;