import axios from 'axios'
import { getCommentStart, getCommentSuccess, getCommentsFailed, getRatingsFailed, getRatingsStart, getRatingsSuccess } from '../commentSlide';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getComments = async (dispatch, idVideo,accessToken) => {
    dispatch(getCommentStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/comments/video/${idVideo}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(getCommentSuccess(res.data));
    } catch (err) {
        dispatch(getCommentsFailed());
    }
};

export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({ videoId, content, accessToken }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/comments`, {
          videoId,
          content
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // DELETE comment action creator
  export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({ commentId, accessToken }, { rejectWithValue }) => {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        return commentId; // Return the id to identify which comment was deleted
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // UPDATE comment action creator
  export const updateComment = createAsyncThunk(
    'comments/updateComment',
    async ({ commentId, content, accessToken }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/comments/${commentId}`, {
          content
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        return response.data; // Return the updated comment data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
export const getRatings = async (dispatch,videoId,accessToken) => {
  dispatch(getRatingsStart());
  try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/video-ratings/${videoId}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });
      dispatch(getRatingsSuccess(res.data));
  } catch (err) {
      dispatch(getRatingsFailed());
  }
};
export const postRatings = createAsyncThunk(
  'ratings/postRatings',
  async ({ videoId, content, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/video-ratings`, {
        videoId,
        content
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);