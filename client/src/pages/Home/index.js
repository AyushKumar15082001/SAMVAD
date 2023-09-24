import CreatePost from '../../components/CreatePost';
import ListPosts from '../../components/ListPosts';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../../Contexts/userContext";
import Styles from './home.module.css';


const Home = () => {
  const [tweets, setTweets] = useState([]);
  const {handleLogout } = useContext(UserContext);

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

  return (
    <div className={Styles.post}>
      <CreatePost {...{ setTweets }} />
      {tweets && tweets.map((item, index) => {
        return <ListPosts key={item._id} {...{ ...item, setTweets }} />
      })}
    </div>
  );
}
export default Home;