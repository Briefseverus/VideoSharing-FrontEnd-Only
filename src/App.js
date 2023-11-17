import './App.css';
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import UserPages from './pages/users/UserPages';
import AdminPages from './pages/admin/AdminPages';
import Header from './Components/header/Header';
import Home from './pages/users/home/Home';
import Login from './Components/login/Login';
import Register from './Components/register/Register';
import Channel from './Components/user/channel/Channel';
import Watch from './Components/user/watch/Watch';
import Footer from './Components/footer/Footer';
import VideoUpload from './Components/user/uploadVideo/VideoUpload ';
import Profile from './Components/user/profile/Profile'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageChannel from './Components/user/manageChannel/ManageChannel';
import SearchPage from './Components/user/searchPage/SearchPage';

function App() {
  return (

    <div className="App">
      <Router>
              <Header />
        <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/channel/:id" element={<Channel />}/>
              <Route path="/video/:id" element={<Watch />}/>
              <Route path="/manageVideo/:id" element={<ManageChannel />}/>
              <Route path="/profile/:id" element={<Profile />}/>
              <Route path="/search" element={<SearchPage />}/>
            </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
