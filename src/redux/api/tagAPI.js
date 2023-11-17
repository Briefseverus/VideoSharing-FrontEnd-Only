import { createTagFailed, createTagStart, createTagSuccess, getTagFailed, getTagStart, getTagSuccess, getTagsFailed, getTagsStart, getTagsSuccess } from "../tagSlice";
import axios from 'axios'
export const fetchTags =  async (dispatch, accessToken) => {
    dispatch(getTagsStart());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/video-tags`,
      {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      });
      dispatch(getTagsSuccess(response.data));
    } catch (error) {
      dispatch(getTagsFailed());
    }
  };
  
  export const fetchTagById = async (dispatch, id, accessToken) => {
    dispatch(getTagStart());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/video-tags/${id}`,
      {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      }
      );
      dispatch(getTagSuccess(response.data));
    } catch (error) {
      dispatch(getTagFailed());
    }
  };
  
  export const setTagForVideo =  async (dispatch, tagData, accessToken) => {
    dispatch(createTagStart());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/video-tags-mapping`, tagData, 
      {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      }
      )
      dispatch(createTagSuccess(response.data));
    } catch (error) {
      dispatch(createTagFailed());
    }
  };
  