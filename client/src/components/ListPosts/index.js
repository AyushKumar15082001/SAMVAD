import axios from 'axios';
import Post from './Post';
// import { useState } from 'react';

const ListPosts = ({ tweets, handleLogout, setTweets, postOwner }) => {
    // const [loading, setLoading] = useState(false);
    // const [showUpdateForm, setShowUpdateForm] = useState(false);

    // const updateHandler = (id, text, image) => {
    //     setLoading(true);
    //     axios.patch('http://localhost:8080/api/posts', { id, text, image },
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         .then((res) => {
    //             setShowUpdateForm(false);
    //             setTweets(tweets.map((tweet) => {
    //                 if (tweet._id === id) {
    //                     tweet.text = text;
    //                     tweet.image = image;
    //                     tweet.date = Date.now();
    //                     return tweet;
    //                 }
    //                 return tweet;
    //             }));
    //         }).catch((err) => {
    //             if (err.response.status === 401) {
    //                 handleLogout()
    //             }
    //             console.log(err);
    //         }).finally(() => {
    //             setLoading(false);
    //         }
    //     )
    // }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8080/api/posts/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setTweets(tweets.filter((tweet) => tweet._id !== id));
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })
    }

    return (
        <>
            {tweets.map((item, index) => {
                return <Post key={index} {...{ ...item, deleteHandler, postOwner, handleLogout, setTweets }} />
            })}
        </>
    )
}


export default ListPosts;