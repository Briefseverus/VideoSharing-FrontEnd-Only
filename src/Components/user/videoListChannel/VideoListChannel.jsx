import React, {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { getVideoAllChannelById } from '../../../redux/api/videoAPI';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './videoListChannel.css'
const VideoListChannel = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const Videochannels = useSelector((state) => state.videos.videoAllChannelById?.videoChannel);
   const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
      getVideoAllChannelById(dispatch,id,currentUser.accessToken)

    },[])
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
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
                </div>
            </div>
        ))}
        </div>
    );
}

export default VideoListChannel;
