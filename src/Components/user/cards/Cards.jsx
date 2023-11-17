import React, {useState, useEffect,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { getVideos } from '../../../redux/api/videoAPI';

import './cards.css'
import {Link} from 'react-router-dom'
function Cards() {
    const [isHovered, setIsHovered] = useState(false);
    const video = useSelector((state) => state.videos.videos?.videos);
    const currentUser = useSelector((state) => state.auth.login?.currentUser.accessToken);
    const dispatch = useDispatch();
    useEffect(() => {
        getVideos(dispatch,currentUser);
    
    }, [dispatch]);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="container ">
        {/* <h2 className='title-card'>All Time Hits</h2> */}
        <div className='card-container' >
        {
            video?.map((video) => (
                <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <img src="https://preview.gentechtreedesign.com/streamlab/wp-content/uploads/2019/03/17.jpg" alt="Movie 1" className={isHovered ? 'zoomed' : ''}/>
                
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
                <div className="card-content">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <p>{video.channel.name}</p>
                </div>
            </div>
    
            ))
        }
        </div>
    </div>
    
  )
}

export default Cards