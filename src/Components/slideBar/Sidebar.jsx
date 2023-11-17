import React from 'react';
import './slide.css'; // Make sure your CSS file is correctly linked
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  // faShorts, 
  faUserCircle, 
  faHistory, 
  faClock, 
  faPlayCircle,
  faPhotoVideo
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <FontAwesomeIcon icon={faHome} className='icon'/>
        <span>Home</span>
      </div>
      {/* <div className="sidebar-item">
        <FontAwesomeIcon icon={faShorts} />
        <span>Shorts</span>
      </div> */}
      <div className="sidebar-item">
        <FontAwesomeIcon icon={faPhotoVideo} className='icon'/>
        <span>Subscriptions</span>
      </div>
      {/* Add other sidebar items here */}
      <div className="sidebar-section">
        <FontAwesomeIcon icon={faUserCircle} className='icon'/>
        <span>You</span>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faPlayCircle} className='icon'/>
          <span>Your channel</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faHistory} className='icon'/>
          <span>History</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faClock} className='icon'/>
          <span>Your videos</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faClock} className='icon'/>
          <span>Watch later</span>
        </div>
      </div>
      {/* Subscriptions section */}
      <div className="sidebar-section">
        <FontAwesomeIcon icon={faPhotoVideo}className='icon' />
        <span>Subscriptions</span>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUserCircle}className='icon' />
          <span>Soi Sáng</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUserCircle} className='icon'/>
          <span>Soi Sáng</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUserCircle}className='icon' />
          <span>Soi Sáng</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
