import '../App.css';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import CreatePost from '../components/CreatePost';
import ListPosts from '../components/ListPosts';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const { name, username } = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const followingCount = 0, followersCount = 0;

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  }, [navigate])

  useEffect(() => {
    axios.get('http://localhost:8080/posts', {
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
        console.log(err);
      })
  }, [handleLogout]);

  const addPost = (text) => {
    axios.post('http://localhost:8080/posts', { text }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTweets(t => [...t, res.data]);
      })
      .catch(err => {
        if (err.response.status === 401) {
          handleLogout()
        }
        console.log(err);
      })
  }

  return (
    <div className="App">
      <Navbar {...{ name }} />
      <div className="container">
        <ProfileCard {...{ name, username, followingCount, followersCount }} />
        <div className="post">
          <CreatePost {...{ addPost }} />
          <ListPosts {...{ tweets, handleLogout , setTweets}} />
        </div>
      </div>
    </div>
  );
}
export default Home;