import { useState, useEffect,  } from 'react';
import './carousels.css'
const Carousels = () => {
  
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prev => 
        prev === 3 ? 1 : prev + 1  
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="carousels">
     {slideIndex === 1 && (
       <div className="slide slide1">
         <div className="slide-content">
           <h2 className="slide-info">
            thieve the bank
           </h2>
           <ul className='slide-title'>
            <li className='slide-title-rating'>
                <span>TV-MA</span>
            </li>
            <li>30 min</li>
            <li>IMDB 9.5</li>
            <li>2028</li>
            <li className='action'>action</li>
           </ul>
           <p className="slide-text">
             Streamlab is a long established fact that a reader will 
             be distracted by the readable content of a page when  
             looking at its layout
           </p>
           </div>
        </div>  
    )}
    {slideIndex === 2 && (
        <div className="slide slide2">
          <div className="slide-content">
            <h2 className="slide-info">
            thieve the bank
            </h2>
            <ul className='slide-title'>
            <li className='slide-title-rating'>
                <span>TV-MA</span>
            </li>
            <li>30 min</li>
            <li>IMDB 9.5</li>
            <li>2028</li>
            <li className='action'>action</li>
           </ul>
            <p className="slide-text">
              Streamlab is a long established fact that a reader will 
              be distracted by the readable content of a page when 
              looking at its layout
            </p>
          </div>
        </div>  
    )}
    {slideIndex === 3 && (
            <div className="slide slide3">
            <div className="slide-content">
            <h2 className="slide-info">
            thieve the bank
                </h2>
                <ul className='slide-title'>
            <li className='slide-title-rating'>
                <span>TV-MA</span>
            </li>
            <li>30 min</li>
            <li>IMDB 9.5</li>
            <li>2028</li>
            <li className='action'>action</li>
           </ul>
                <p className="slide-text">
                Streamlab is a long established fact that a reader will 
                be distracted by the readable content of a page when 
                looking at its layout
                </p>
            </div> 
            </div>
        )}
    <div className="video-container">
    <iframe  src="https://www.youtube.com/embed/3gNuUcPg1fk?si=G-SR3Wo7mpJig9Rs"  allowfullscreen></iframe>
    </div>

    </div>
  );
}

export default Carousels;
