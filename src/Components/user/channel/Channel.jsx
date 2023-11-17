import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./channel.css";
import { getChannel } from "../../../redux/api/channelsAPI";
import VideoList from "../videoList/VideoList";
import VideoUpload from "../uploadVideo/VideoUpload ";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../slideBar/Sidebar";
const Channel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channel?.channel);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  console.log(currentUser);
  useEffect(() => {
    getChannel(dispatch, id, currentUser.accessToken);
  }, [dispatch]);
  return (
    <Container fluid>
      {/* {channels?.map((item) => (  */}
      <Row>
        <Col sm={2}>
          <Sidebar/>
        </Col>
        <Col sm={10}>
        <div className="channel-card">
        <div className="channel-image">
          <img
            src="https://preview.gentechtreedesign.com/streamlab/wp-content/uploads/2019/03/17.jpg"
            alt="Channel Thumbnail"
          />
        </div>
        <div className="channel-details">
          <h3>{channels.name}</h3>

          <div className="channel-stats">
            <span>{channels.creator?.username}</span>
            <br />
            <span>{channels.subcribers}</span>
          </div>
          <p className="channel-description">{channels.description}</p>
          <div>
            {channels.owner ? (
              <Link to={`/manageVideo/${channels.id}`}>Manage Video</Link>
            ) : (
              <button className="subscribe-btn">Subscribe</button>
            )}
          </div>
        </div>
      </div>
      <VideoList />

        </Col>
      </Row>

    </Container>
  );
};

export default Channel;
