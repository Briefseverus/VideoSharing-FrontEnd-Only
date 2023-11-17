import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Channel from "../channel/Channel";
import { getUser, getVipUser } from "../../../redux/api/authAPI";
import "./profile.css";
import VideoUpload from "../uploadVideo/VideoUpload ";
import { getChannelAllById } from "../../../redux/api/channelsAPI";
import { getVideoById } from "../../../redux/api/videoAPI";
import CreateChannel from "../createChannel/CreateChannel";
import Tag from "../tag/Tag";
import Categories from "../categories/Categories";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user?.user);
  
  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser.accessToken
  );
  const navigate = useNavigate();
  const [isChannelVisible, setIsChannelVisible] = useState(false);
  const channelByUser = useSelector(
    (state) => state.channels.allChannel?.allChannel
  );
  const handleDeleteChannel = async (channelId) => {
    try {
      // Replace 'yourAuthToken' with the actual token, usually from state or props
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/channels/${channelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser}` // Assuming you send a token
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Error deleting the video');
      }
    } catch (error) {
      // Handle any errors
      console.error('There was an error deleting the channel:', error.response || error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser(currentUser, id, dispatch);
        await getVideoById(dispatch, id, currentUser);
        await getChannelAllById(dispatch, id, currentUser);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id, currentUser, dispatch]);
  const toggleCreateChannel = () => {
    setIsChannelVisible(!isChannelVisible);
  };
  const handlePurchaseVip = async () => {
    getVipUser(currentUser, dispatch);
  };
  return (
    <div>
      {user?.owner ? (
        <div class="container-profile">
          <aside class="sidebar">
            <div class="logo-section">
              <div class="logo-profile">T</div>
              {user.vip ? (
                <span class="vip-icon">VIP</span>
              ) : (
                <button onClick={handlePurchaseVip}>Buy VIP</button>
              )}
              <div class="channel-name">{user.username}</div>
            </div>
            <div class="menu">
              <div class="menu-item active">Dashboard</div>
              <div class="menu-item">Content</div>
              <div class="menu-item">Analytics</div>
            </div>
          </aside>

          <div class="main-content">
            <nav class="content-navigation">
              <ul>
                <li class="active">Videos</li>
                <li>Live</li>
                <li>Playlists</li>
                <li>Podcasts</li>
                <li>Promotions</li>
              </ul>
            </nav>

            <div class="video-section"></div>
            <div>
              {channelByUser.map((channel) => (
                <div className="channel-list-item" key={channel.id}>
                  <img
                    src='https://i.ytimg.com/vi/EowulImsH5Q/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAXwzAJlzhcnAnGonEc_S2CfYntkg'
                    alt={`${channel.name} logo`}
                    className="profile-channel-image"
                  />
                  <div className="channel-content">
                    <Link
                      to={`/channel/${channel.id}`}
                      className="channel-link"
                    >
                      {channel.name}
                    </Link>
                    <div className="channel-description">
                      {channel.description}
                    </div>
                    <button onClick={() => handleDeleteChannel(channel.id)}>Delete Channel</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={toggleCreateChannel}>Create channel</button>
            {isChannelVisible && (
              <CreateChannel closeModal={toggleCreateChannel} />
            )}
          </div>
        </div>
      ) : (
        <Channel />
      )}
    </div>
  );
};

export default Profile;
