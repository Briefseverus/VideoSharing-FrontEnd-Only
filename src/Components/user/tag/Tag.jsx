import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTags, setTagForVideo } from "../../../redux/api/tagAPI";
import { getVideoAllChannelById } from "../../../redux/api/videoAPI";

function Tag({ id }) {
  const [videoId, setVideoId] = useState("");
  const [tagId, setTagId] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const Videochannels = useSelector(
    (state) => state.videos.videoAllChannelById?.videoChannel
  );
  const tags = useSelector((state) => state.tags.tags?.data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      videoId: videoId,
      tagId: tagId,
    };
    setTagForVideo(dispatch, data, currentUser.accessToken);
  };
  useEffect(() => {
    getVideoAllChannelById(dispatch, id, currentUser.accessToken);
    fetchTags(dispatch, currentUser.accessToken);
  }, []);

  const handleVideoChange = (event) => {
    setVideoId(event.target.value);
  };
  const handleTags = (event) => {
    setTagId(event.target.value);
  };
  return (
    <div className="upload-container">
      {errorMessage && (
        <div className="register-error-message">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="form-uploadVideo">
        <div className="form-row">
          <label>
            videoId
            <select onChange={handleVideoChange}>
              <option value="">Select tags</option>
              {Videochannels?.map((video) => (
                <option key={video.id} value={video.id}>
                  {video.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="form-row">
            tagId
            <select onChange={handleTags}>
              <option value="">Select Channel</option>
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.tagName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="button-channel">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default Tag;
