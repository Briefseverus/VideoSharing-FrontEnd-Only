import React from 'react'
import Header from '../../Components/header/Header'

import './userPages.css'
import Footer from '../../Components/footer/Footer'
import Channel from '../../Components/user/channel/Channel'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from '../../Components/login/Login'
import Register from '../../Components/register/Register'
import Home from './home/Home'
import Watch from '../../Components/user/watch/Watch'

function UserPages() {
  return (
    <div >
      <Router>
          <Header />
        <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/channel" element={<Channel />}/>
              <Route path="/video/:id" element={<Watch />}/>
            </Routes>
        <Footer />
      </Router>
      
    </div>
  )
}
export default UserPages