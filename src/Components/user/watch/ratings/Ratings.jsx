import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getRatings, postRatings } from '../../../../redux/api/commnetAPI';
import { useDispatch, useSelector } from 'react-redux';
import './ratings.css'; // Import your CSS file where the above styles are defined

const Ratings = ({ videoId, accessToken }) => {
  const [hoverRating, setHoverRating] = useState(0); // State to keep track of hover to show hover effects
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.comments.ratings.ratings);
  const [rating, setRating] = useState(ratings);
  const [isVideoId, setIsVideoId] = useState(videoId);

  const handleRating = (rate) => {
    setRating(rate);
    postRating(rate);
  };

  const handleMouseOver = (rate) => {
    setHoverRating(rate);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const postRating = async (rate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/video-ratings`, {
        videoId: videoId,
        rating: rate
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Rating submitted successfully', response.data);
      // Fetch updated ratings after posting
      getRatings(dispatch,isVideoId,accessToken);
    } catch (error) {
      console.error('Error submitting rating', error);
    }
  };
  // const updateRating = async (rate) => {
  //   try {
  //     const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/video-ratings/${ratingId}`, {
  //       rating: rate
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log('Rating updated successfully', response.data);
  //     // Update local state and Redux store as needed
  //   } catch (error) {
  //     console.error('Error updating rating', error);
  //   }
  // };
  // useEffect(() => {
  //   getRatings(dispatch,videoId,accessToken);
  // }, [dispatch, accessToken]);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`star ${index <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => handleRating(index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Ratings;
