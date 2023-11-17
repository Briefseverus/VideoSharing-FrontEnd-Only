import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Channel from '../channel/Channel'
import {getUser} from '../../../redux/api/authAPI'
import VideoUpload from '../uploadVideo/VideoUpload ';
import { getChannel, getChannelAllById } from '../../../redux/api/channelsAPI';
import { getVideoAllChannelById, getVideoById } from '../../../redux/api/videoAPI';
import CreateChannel from '../createChannel/CreateChannel';
import Categories from '../categories/Categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import UpdateVideo from './updateVideo/UpdateVideo';
import Tag from '../tag/Tag';
import './manageChannel.css'
const ManageChannel = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user?.user);
    const currentUser = useSelector((state) => state.auth.login?.currentUser.accessToken);
    const Videochannels = useSelector((state) => state.videos.videoAllChannelById?.videoChannel);

    const [isUploadVisible, setIsUploadVisible] = useState(false);
    const [isChannelVisible, setIsChannelVisible] = useState(false);
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);
    const [isTagVisible, setIsTagVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isUpdateVideo, setIsUpdateVideo] = useState(null);
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    useEffect(() => {
        getUser(currentUser,id,dispatch)
        getVideoAllChannelById(dispatch,id,currentUser)

    }, [id, currentUser, dispatch])
    const toggleUploadChannel = () => {
      setIsUploadVisible(!isUploadVisible);
    };
    const toggleCategoryChannel = () => {
      setIsCategoryVisible(!isCategoryVisible);
    };
    const toggleTagChannel = () => {
      setIsTagVisible(!isTagVisible);
    };
    const toggleCreateChannel = () => {
      setIsChannelVisible(!isChannelVisible);
    };
    const toggleUpdateVideo = (videoId) => {
      setIsUpdateVideo(prevVideoId => prevVideoId === videoId ? null : videoId);
    };
    const deleteVideo = async (videoId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/videos/${videoId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser}` // Assuming you send a token
          },
        });
    
        if (!response.ok) {
          throw new Error('Error deleting the video');
        }
      } catch (error) {
        console.error('There was an error deleting the video', error);
      }
    };

    return (
     <div>
       {
        user?.owner ? (
          <div class="container-profile">
   
          <aside class="sidebar-channel">
          <div class="logo-section-channel">
            <div class="logo-profile">T</div>
            <div class="channel-name">{user.username}</div>
          </div>
          <div class="menu">
            <div class="menu-item active">Dashboard</div>
            {/* <div class="menu-item" onClick={toggleCreateChannel}>Create VIDEOS</div> */}
            <div class="menu-item" onClick={toggleUploadChannel}>Upload video</div>
            {isUploadVisible && <VideoUpload closeModal={toggleUploadChannel} />}
            <div class="menu-item" onClick={toggleCategoryChannel}>Category video</div>
            {isCategoryVisible && <Categories id={id} />} 
            <div class="menu-item" onClick={toggleTagChannel}>Tag video</div>
            {isTagVisible && <Tag id={id} />}
          </div>
        </aside>
      
          <div class="main-content">
    
            <nav class="content-navigation">
              <ul>
                <li class="active">Videos</li>
                <li >Live</li>
                <li>Playlists</li>
                <li>Podcasts</li>
                <li>Promotions</li>
              </ul>
            </nav>
      
            <div className="video-list">
            
             {Videochannels.map(video => (
                <div className="video" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <img src='https://preview.gentechtreedesign.com/streamlab/wp-content/uploads/2019/03/17.jpg' alt="Movie 1" className={isHovered ? 'zoomed' : ''}/>
                
                <div className="play-icon">
                <FontAwesomeIcon icon={faPlayCircle} />
                </div>
                {isHovered && (
                <CSSTransition 
                    in={isHovered} 
                    timeout={300}
                    classNames="fade"
                >
                    <Link className="play-icon" to={`/video/${video.id}`}>
                    <FontAwesomeIcon icon={faPlayCircle} /> 
                    </Link>
                </CSSTransition>
                )}
                <div className="video-list-title">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <Link to={`/video/${video.id}`}></Link>
                <button onClick={() => deleteVideo(video.id)}>Delete Video</button>
                <button onClick={() => toggleUpdateVideo(video.id)}>update Video</button>
                {isUpdateVideo === video.id && (
                      <UpdateVideo
                        videoId={video.id}
                        title={video.title}
                        description={video.description}
                        fileName={video.fileName}
                      />
                    )}
                </div>
            </div>
         ))}
        </div>
          </div>
        </div>
        ) :(
          <Channel />
        )
      }
     </div>
    );
}

export default ManageChannel;
