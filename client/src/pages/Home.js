import '../App.css';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import CreatePost from '../components/CreatePost';
import ListPosts from '../components/ListPosts';
import { useState } from 'react';
const Home = () => {
  // const [user, setUser] = useState({ name: '', userName: '', followingCount: 0, followersCount: 0 });
  const [newTweet, setNewTweet] = useState('');
  const newTweetHandler = (tweet) => setNewTweet(tweet);
  const {name, username} = JSON.parse(localStorage.getItem('userData'));
  const followingCount=0, followersCount=0;
  // useEffect(() => {
    // setUser({ name: 'Ayush Singh', userName: 'coolAyush', followingCount: 23, followersCount: 25 });
  // }, []);
  // console.log("App returns ",user[firstName,lastName,userName]);
  return (
    <div className="App">
      {/* <div> */}
      <Navbar {...{name}} />
      {/* </div> */}
      <div className="container">
        <ProfileCard {...{name, username, followingCount, followersCount}} />
        <div className="post">
          <CreatePost {...{ name, username, newTweetHandler }} />
          <ListPosts newTweet={newTweet} />
        </div>
      </div>
    </div>
  );
}
export default Home;