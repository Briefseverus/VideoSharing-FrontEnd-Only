import axios from 'axios'
import { createChannelFailed, createChannelStart, createChannelSuccess, getChannelAllByUserFail, getChannelAllByUserStart, getChannelAllByUserSuccess, getChannelFailed, getChannelStart, getChannelSuccess, subsChannelFailed, subsChannelStart, subsChannelSuccess, unSubsChannelFailed, unSubsChannelStart,unSubsChannelSuccess } from '../channelSlice'
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getChannel = async(dispatch,id, accessToken) => {
    dispatch(getChannelStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/channels/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(getChannelSuccess(res.data))
    }catch(err) {
        dispatch(getChannelFailed())
    }
}
export const getChannelAllById = async(dispatch,id, accessToken) => {
    dispatch(getChannelAllByUserStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/channels/user/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(getChannelAllByUserSuccess(res.data))
    }catch(err) {
        dispatch(getChannelAllByUserFail(err))
    }
}
export const createChannel = async(dispatch, channel,accessToken) => {
    dispatch(createChannelStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/channels`,channel,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(createChannelSuccess(res.data))
    }catch(err) {
        dispatch(createChannelFailed())
    }
}
export const checkSubsChannel = async(dispatch, id,accessToken) => {
    dispatch(subsChannelStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user-channel-subs/is-subscribed/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        )
        dispatch(subsChannelSuccess(res.data))
    }catch(err) {
        dispatch(subsChannelFailed())
    }
}
export const subscribeToChannel = createAsyncThunk(
    'channels/subscribeToChannel',
    async ({ channelId, accessToken }, { dispatch }) => {
      dispatch(subsChannelStart());
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/user-channel-subs/subscribe/${channelId}`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
          dispatch(subsChannelSuccess(true));
        }
      } catch (error) {
        dispatch(subsChannelFailed());
      }
    }
);
  export const unsubscribeFromChannel = createAsyncThunk(
    'channels/unsubscribeFromChannel',
    async ({ channelId, accessToken }, { dispatch }) => {
      dispatch(unSubsChannelStart());
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}api/user-channel-subs/unsubscribe/${channelId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
          dispatch(unSubsChannelSuccess(false));
        }
      } catch (error) {
        dispatch(unSubsChannelFailed());
      }
    }
);