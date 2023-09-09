// import '../App.css';
import Navbar from '../../components/Navbar';
import ProfileCard from '../../components/ProfileCard';
import CreatePost from '../../components/CreatePost';
import ListPosts from '../../components/ListPosts';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from './home.module.css';


const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});
  const { name, username, profilePic, bannerPic } = user;
  const navigate = useNavigate();
  const followingCount = 0, followersCount = 0;

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate])

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTweets(res.data);
        // console.log(res);
      })
      .catch(err => {
        if (err.response.status === 401) {
          handleLogout()
        }
      })

    //get user data
    axios.get('http://localhost:8080/api/user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setUser(res.data);
      }
      ).catch(err => {
        console.log(err);
      })
  }, [handleLogout]);

  const addPost = (text, file) => {
    axios.post('http://localhost:8080/api/posts', { text, image: file }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTweets(t => [{...res.data, name, username, profilePic}, ...t]);
      })
      .catch(err => {
        if (err.response.status === 401) {
          handleLogout()
        }
        console.log(err);
      })
  }

  return (
    <div className={Styles.App}>
      <Navbar {...{ name, profilePic, handleLogout }} />
      <div className={Styles.container}>
        <ProfileCard {...{ name, username, profilePic, bannerPic, followingCount, followersCount }} />
        <div className={Styles.post}>
          <CreatePost {...{ addPost }} />
          <ListPosts {...{ tweets, handleLogout, setTweets, postOwner: username }} />
        </div>
      </div>
    </div>
  );
}
export default Home;