import '../App.css';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import CreatePost from '../components/CreatePost';
import ListPosts from '../components/ListPosts';
import { useState, useEffect } from 'react';
const Home = () =>{
    const [user,setUser] = useState({name:'',userName:'', followingCount:0, followersCount:0});
  const [newTweet,setNewTweet] = useState('');
  const newTweetHandler = (tweet)=>setNewTweet(tweet);
  useEffect(() => {
    setUser({name:'Ayush Singh',userName:'coolAyush', followingCount:23, followersCount:25});
  }, []);
  // console.log("App returns ",user[firstName,lastName,userName]);
  return (
    <div className="App">
      {/* <div> */}
        <Navbar name = {user.name}/>
      {/* </div> */}
      <div className="container">
        <ProfileCard {...user} />
        <div className="post">
          <CreatePost user = {{name:user.name, userName:user.userName}} newTweetHandler={newTweetHandler}/>
          <ListPosts newTweet={newTweet} />
        </div>
      </div>
    </div>
  );
}
export default Home;