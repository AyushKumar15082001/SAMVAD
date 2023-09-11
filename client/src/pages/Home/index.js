// import '../App.css';
import Navbar from '../../components/Navbar';
import ProfileCard from '../../components/ProfileCard';
import CreatePost from '../../components/CreatePost';
import ListPosts from '../../components/ListPosts';
import FollowPeople from '../../components/FollowPeople';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from './home.module.css';


const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { name, username, bannerPic, bio } = user;
  const profilePic = user.profilePic ? user.profilePic : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  const followingCount = 1090, followersCount = 1307;

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
        setTweets(t => [{ ...res.data, name, username, profilePic }, ...t]);
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
        <ProfileCard {...{ name, username, profilePic, bannerPic, followingCount, followersCount, bio }} />
        <div className={Styles.post}>
          <CreatePost {...{ addPost }} />
          <ListPosts {...{ tweets, handleLogout, setTweets, postOwner: username }} />
        </div>
        <FollowPeople />
      </div>
    </div>
  );
}
export default Home;