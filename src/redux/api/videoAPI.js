import axios from 'axios'
import { getVideosFailed,getVideosStart,getVideosSuccess,getVideoByIdStart,getVideoByIdFailed,getVideoByIdSuccess, uploadVideosStart, uploadVideosSuccess, uploadVideosFailed,getVideoSimilarByIdStart,getVideoSimilarByIdSuccess,getVideoSimilarByIdFailed, getVideoAllChannelByIdFailed, getVideoAllChannelByIdStart, getVideoAllChannelByIdSuccess, videoViewStart, videoViewSuccess, videoViewFail,totalVideoViewFail,totalVideoViewStart,totalVideoViewSuccess} from '../videoSlice'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getVideos = async(dispatch, accessToken) => {
    dispatch(getVideosStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/videos`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(getVideosSuccess(res.data))
    }catch(err) {
        dispatch(getVideosFailed())
    }
}
export const getVideoById = async(dispatch, id,accessToken) => {
    dispatch(getVideoByIdStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/videos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(getVideoByIdSuccess(res.data))
    }catch(err) {
        dispatch(getVideoByIdFailed())
    }
}
export const getVideoSimilarById = async(dispatch, id,accessToken) => {
    dispatch(getVideoSimilarByIdStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/videos/similar/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(getVideoSimilarByIdSuccess(res.data))
    }catch(err) {
        dispatch(getVideoSimilarByIdFailed())
    }
}
export const getVideoAllChannelById = async (dispatch, id,accessToken) => {
    dispatch(getVideoAllChannelByIdStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/videos/channels/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(getVideoAllChannelByIdSuccess(res.data))
    }catch(err) {
        dispatch(getVideoAllChannelByIdFailed())
    }
}
export const uploadVideo = async(dispatch, video,accessToken) => {
    dispatch(uploadVideosStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/videos/upload`,video,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(uploadVideosSuccess(res.data))
    }catch(err) {
        dispatch(uploadVideosFailed())
    }
}
export const videoView = createAsyncThunk(
    'videos/videoView',
    async ({ videoId, accessToken }, { dispatch }) => {
      dispatch(videoViewStart());
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/video-views/${videoId}`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
          dispatch(videoViewSuccess(true));
        }
      } catch (error) {
        dispatch(videoViewFail());
      }
    }
);
export const totalVideoView = async(dispatch, videoId,accessToken) => {
    dispatch(totalVideoViewStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/video-views/${videoId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(totalVideoViewSuccess(res.data))
    }catch(err) {
        dispatch(totalVideoViewFail())
    }
}
