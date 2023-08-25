// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import CreatePost from './components/CreatePost';
import ListPosts from './components/ListPosts';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="container">
        <ProfileCard />
        <div className="post">
          <CreatePost />
          <ListPosts />
        </div>
      </div>
    </div>
  );
}

export default App;
