// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import CreatePost from './components/CreatePost';
import ListPosts from './components/ListPosts';
import { useState,useEffect } from 'react';

function App() {
  const [user,setUser] = useState({firstName:'',lastName:'',userName:'', followingCount:0, followersCount:0});
  const [newTweet,setNewTweet] = useState('');
  const newTweetHandler = (tweet)=>setNewTweet(tweet);
  useEffect(() => {
    setUser({firstName:'Ayush',lastName:'Kumar',userName:'coolAyush', followingCount:23, followersCount:25});
  }, []);
  // console.log("App returns ",user[firstName,lastName,userName]);
  return (
    <div className="App">
      {/* <div> */}
        <Navbar userName = {{firstName:user.firstName, lastName:user.lastName}}/>
      {/* </div> */}
      <div className="container">
        <ProfileCard {...user} />
        <div className="post">
          <CreatePost user = {{firstName:user.firstName, lastName:user.lastName, userName:user.userName}} newTweetHandler={newTweetHandler}/>
          <ListPosts newTweet={newTweet} />
        </div>
      </div>
    </div>
  );
}

export default App;
