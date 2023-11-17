import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  setCategoryForVideo,
} from "../../../redux/api/categoriesAPI";
import { getVideoAllChannelById } from "../../../redux/api/videoAPI";

function Categories({ id }) {
  console.log(id);
  const [videoId, setVideoId] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const Videochannels = useSelector(
    (state) => state.videos.videoAllChannelById?.videoChannel
  );
  const categories = useSelector(
    (state) => state.categories.categories.categories
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const create = {
      videoId: videoId,
      categoriesId: categoriesId,
    };
    setCategoryForVideo(dispatch, create, currentUser.accessToken);
  };

  const handleVideoChange = (event) => {
    setVideoId(event.target.value);
  };
  const handleCategoriesChange = (event) => {
    setCategoriesId(event.target.value);
  };
  useEffect(() => {
    getVideoAllChannelById(dispatch, id, currentUser.accessToken);
    getCategories(currentUser.accessToken, dispatch);
  }, [dispatch, currentUser]);
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
              <option value="">Select Channel</option>
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
            categoriesId
            <select onChange={handleCategoriesChange}>
              <option value="">Select Channel</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="button-channel" type="submit">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default Categories;
