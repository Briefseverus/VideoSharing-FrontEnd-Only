import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './update.css'
function UpdateVideo({ videoId,title,description,fileName }) {
  const [videoData, setVideoData] = useState({ title: title, description: description, fileName:fileName });
  const currentUser = useSelector((state) => state.auth.login?.currentUser.accessToken);

  const updateVideo = async (videoId, updatedVideoData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser}`,
        },
        body: JSON.stringify(updatedVideoData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Video updated successfully:', result);
      // Handle further actions here, such as state updates or UI notifications
    } catch (error) {
      console.error('There was an error updating the video:', error);
    }
  };

  const handleInputChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVideo(videoId, videoData).then(result => {
      // Handle the result here
      console.log(result);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="update-video-form">
    <input
      type="text"
      name="title"
      value={videoData.title}
      onChange={handleInputChange}
      placeholder="Video Title"
      className="update-video-input"
    />
    <input
      type="text"
      name="description"
      value={videoData.description}
      onChange={handleInputChange}
      placeholder="Video Description"
      className="update-video-input"
    />
    <input
      type="text"
      name="fileName"
      value={videoData.fileName}
      onChange={handleInputChange}
      placeholder="File Name"
      className="update-video-input"
    />
    <button type="submit" className="update-video-button">Update Video</button>
  </form>
  );
}

export default UpdateVideo;
