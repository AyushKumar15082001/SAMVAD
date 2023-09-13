import CreatePost from '../../components/CreatePost';
import ListPosts from '../../components/ListPosts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import Styles from './home.module.css';


const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [{user, handleLogout }] = useOutletContext();

  //get all posts
  useEffect(() => {
    axios.get('http://localhost:8080/api/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTweets(res.data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          handleLogout()
        }
      })
  }, [handleLogout]);

  const addPost = (text, file) => {
    axios.post('http://localhost:8080/api/posts', { text, image: file }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTweets(t => [{ ...res.data, name: user.name, username: user.username, profilePic:user.profilePic }, ...t]);
      })
      .catch(err => {
        if (err.response.status === 401) {
          handleLogout()
        }
        console.log(err);
      })
  }

  return (
    <div className={Styles.post}>
      <CreatePost {...{ addPost }} />
      <ListPosts {...{ tweets, setTweets, handleLogout, postOwner: user.username }} />
    </div>
  );
}
export default Home;