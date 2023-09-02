import axios from 'axios';
import Post from './Post';

const ListPosts = ({ tweets, handleLogout, setTweets }) => {

    const updateHandler = (id, text) => {
        axios.patch('http://localhost:8080/api/posts', { id, text },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setTweets(tweets.map((tweet) => {
                    if (tweet._id === id) {
                        return res.data;
                    }
                    return tweet;
                }));
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleLogout()
                }
                console.log(err);
            })

    }

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
        <div>
            {tweets.map((item, index) => {
                return <Post key={index} {...{ ...item, updateHandler, deleteHandler }} />
            })}
        </div>
    )
}


export default ListPosts;