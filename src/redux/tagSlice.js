import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Slice
const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tag: {
      data: null,
      isFetching: false,
      error: false
    },
    tags: {
      data: [],
      isFetching: false,
      error: false
    },
    createTag: {
      data: null,
      isFetching: false,
      error: false
    },
    subscribed: false,
  },
  reducers: {
    // Tags fetching
    getTagsStart: (state) => {
      state.tags.isFetching = true;
    },
    getTagsSuccess: (state, action) => {
      state.tags.isFetching = false;
      state.tags.data = action.payload;
      state.tags.error = false;
    },
    getTagsFailed: (state) => {
      state.tags.isFetching = false;
      state.tags.error = true;
    },

    // Tag fetching by ID
    getTagStart: (state) => {
      state.tag.isFetching = true;
    },
    getTagSuccess: (state, action) => {
      state.tag.isFetching = false;
      state.tag.data = action.payload;
      state.tag.error = false;
    },
    getTagFailed: (state) => {
      state.tag.isFetching = false;
      state.tag.error = true;
    },

    // Tag creation
    createTagStart: (state) => {
      state.createTag.isFetching = true;
    },
    createTagSuccess: (state, action) => {
      state.createTag.isFetching = false;
      state.createTag.data = action.payload;
      state.createTag.error = false;
    },
    createTagFailed: (state) => {
      state.createTag.isFetching = false;
      state.createTag.error = true;
    },
  }
});

// Actions
export const {
  getTagsStart,
  getTagsSuccess,
  getTagsFailed,
  getTagStart,
  getTagSuccess,
  getTagFailed,
  createTagStart,
  createTagSuccess,
  createTagFailed,
} = tagSlice.actions;
 
 export default tagSlice.reducer