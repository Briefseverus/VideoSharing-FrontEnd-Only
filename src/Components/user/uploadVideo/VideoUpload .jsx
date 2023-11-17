import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadVideo } from "../../../redux/api/videoAPI";
import "./videoUpload.css";
import { getChannelAllById } from "../../../redux/api/channelsAPI";

const VideoUpload = ({ closeModal }) => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [channelId, setChannelId] = useState("");
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const channelByUser = useSelector(
    (state) => state.channels.allChannel?.allChannel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getChannelAllById(dispatch, currentUser.userId, currentUser.accessToken);
  }, [dispatch, currentUser]);

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleChannelIdChange = (event) => {
    setChannelId(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!video) {
      alert("Please select a video to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", video);
    formData.append(
      "videoDTO",
      new Blob([JSON.stringify({ title, description, fileName, channelId })], {
        type: "application/json",
      })
    );

    try {
      await uploadVideo(dispatch, formData, currentUser.accessToken);
    } catch (error) {
      console.error(
        "Error uploading video:",
        error.response ? error.response.data : error
      );
      alert(
        "Error uploading video: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="form-uploadVideo">
        <div className="form-row">
          <label>
            Video Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Video Description:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Select video:
            <input type="file" onChange={handleVideoChange} accept="video/*" />
          </label>
        </div>
        <div className="form-row">
          <label>
            Video FileName:
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Video channelId:
            <select value={channelId} onChange={handleChannelIdChange}>
              <option value="">Select Channel</option>
              {channelByUser.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="button-channel" type="submit">
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
