import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './videoList.css'
import Tab from '../tabChannel/Tab';
import VideoListChannel from '../videoListChannel/VideoListChannel';
const  VideoList = () => {

    const [activeTab, setActiveTab] = useState('Videos');

    return (
      
      <div className="video-list">
      <div className="tab-list">
      <Tab name="Videos" activeTab={activeTab} onClick={setActiveTab}>
        <i className="fas fa-film"></i>
      </Tab>
      
      <Tab name="Playlists" activeTab={activeTab} onClick={setActiveTab}>
        <i className="fas fa-list"></i>
      </Tab>

      <Tab name="Shorts" activeTab={activeTab} onClick={setActiveTab}>
        <i className="fas fa-video"></i>
      </Tab>
      </div>
        {activeTab === 'Videos' && <VideoListChannel />}
        {activeTab === 'Playlists' && <VideoListChannel />}
        {activeTab === 'Shorts' && <VideoListChannel />}
     </div>
    );
  }
  export default VideoList