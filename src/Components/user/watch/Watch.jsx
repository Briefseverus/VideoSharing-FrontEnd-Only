import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getVideoById,
  getVideoSimilarById,
  totalVideoView,
  videoView,
} from "../../../redux/api/videoAPI";
import { useSelector, useDispatch } from "react-redux";
import "./watch.css";
import {
  getChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
  checkSubsChannel,
} from "../../../redux/api/channelsAPI";
import {
  deleteComment,
  getComments,
  getRatings,
  postComment,
  postRatings,
  updateComment,
} from "../../../redux/api/commnetAPI";
import Ratings from "./ratings/Ratings";
const Watch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const videoById = useSelector((state) => state.videos?.videoById.video);
  const comments = useSelector((state) => state.comments.comments);
  const totalVideoViews = useSelector((state) => state.videos.msg);
  const channels = useSelector((state) => state.channels.channel?.channel);
  const videoSimillarById = useSelector(
    (state) => state.videos?.videoSimillarById.videoSimillar
  );
  const subscribed = useSelector((state) => state.channels.subscribed);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(subscribed);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [rating, setRating] = useState(0);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // POST comment
  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      dispatch(
        postComment({
          videoId: id,
          content: newComment,
          accessToken: currentUser.accessToken,
        })
      );
      setNewComment("");
    }
  };
  const handleRating = (rate) => {
    setRating(rate);
    // You would call postRating here to POST the rating to the backend
    postRatings(rate);
  };
  // DELETE comment
  const handleDeleteComment = (commentId) => {
    dispatch(
      deleteComment({ commentId, accessToken: currentUser.accessToken })
    );
  };

  // UPDATE comment
  const handleUpdateComment = (commentId) => {
    if (editCommentContent.trim() !== "") {
      dispatch(
        updateComment({
          commentId,
          content: editCommentContent,
          accessToken: currentUser.accessToken,
        })
      );
      setEditCommentId(null);
      setEditCommentContent("");
    }
  };
  useEffect(() => {
    getVideoById(dispatch, id, currentUser.accessToken);
    getChannel(dispatch, videoById.channelId, currentUser.accessToken);
    getVideoSimilarById(dispatch, id, currentUser.accessToken);
    getComments(dispatch, id, currentUser.accessToken);
    checkSubsChannel(dispatch, videoById.channelId, currentUser.accessToken);
    const viewTimer = setTimeout(() => {
      dispatch(
        videoView({ videoId: id, accessToken: currentUser.accessToken })
      );
    }, 30000);
    totalVideoView(dispatch, id, currentUser.accessToken);
    return () => clearTimeout(viewTimer);
  }, []);

  const handleEditChange = (content) => {
    setEditCommentContent(content);
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentContent("");
  };

  const handleSubscribe = () => {
    dispatch(
      subscribeToChannel({
        channelId: videoById.channelId,
        accessToken: currentUser.accessToken,
      })
    );
  };

  const handleUnsubscribe = () => {
    dispatch(
      unsubscribeFromChannel({
        channelId: videoById.channelId,
        accessToken: currentUser.accessToken,
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col sm={9} className="watch-video">
          <iframe src={videoById.videoUrl} allowfullscreen></iframe>
          <div></div>
          <div className="video-metadata">
            <h1 className="video-title">{videoById.title}</h1>
          </div>
          <div className="channel-info">
            <div className="channelUser">
              <img
                src="https://pbs.twimg.com/media/FkD9u3jWQAAfoLg.jpg"
                alt="Logo"
                class="logo"
              />
              <div>
                <div className="channel-name">
                  <Link to={`/channel/${videoById.channelId}`}>
                    {channels.name}
                  </Link>
                </div>
                <div className="video-stats">
                  <span>{channels.subcribers} Subscribe</span>
                </div>
              </div>
            </div>
            <button
              className="subscribe-button"
              onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
          <Ratings videoId={id} accessToken={currentUser.accessToken} />
          <div> {totalVideoViews}views</div>
          <div className="video-description">{videoById.description}</div>
          <div className="new-comment-area">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="new-comment-input" // Added class for styling
            />
            <button
              onClick={handlePostComment}
              className="new-comment-button" // Added class for styling
            >
              Comment
            </button>
          </div>
          <div className="comments-section">
            <h2>Comments</h2>
            {comments.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-author">{comment.userId}</div>
                {/* Show edit and delete options only if the current user made the comment */}
                {currentUser.userId === comment.userId && (
                  <div>
                    {editCommentId === comment.id ? (
                      <div>
                        <input
                          className="edit-comment-input"
                          type="text"
                          value={editCommentContent}
                          onChange={(e) => handleEditChange(e.target.value)}
                        />
                        <button
                          className="comment-button update"
                          onClick={() => handleUpdateComment(comment.id)}
                        >
                          Update
                        </button>
                        <button
                          className="comment-button cancel"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="comment-content">{comment.content}</p>
                        <button
                          className="comment-button edit"
                          onClick={() => handleEdit(comment)}
                        >
                          Edit
                        </button>
                        <button
                          className="comment-button delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <p className="comment-date">{comment.postDate}</p>
                {/* Add more comment details here */}
              </div>
            ))}
          </div>
        </Col>
        <Col sm={3} className="related-videos">
          <h3>Các Video Liên Quan</h3>
          {videoSimillarById?.map((video) => (
            <div className="watch-video-list">
              <div
                className="watch-card"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://preview.gentechtreedesign.com/streamlab/wp-content/uploads/2019/03/7.jpg"
                  alt="Movie 1"
                />

                {/* <div className="video-title"> */}
                <div className="play-icon">
                  <FontAwesomeIcon icon={faPlayCircle} />
                </div>
                {isHovered && (
                  <CSSTransition in={isHovered} timeout={300} classNames="fade">
                    <a className="play-icon" href={`/video/${video.id}`}>
                      <FontAwesomeIcon icon={faPlayCircle} />
                    </a>
                  </CSSTransition>
                )}
                <div className="watch-title">
                  <a href={`/video/${video.id}`}>{video.title}</a>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Watch;
