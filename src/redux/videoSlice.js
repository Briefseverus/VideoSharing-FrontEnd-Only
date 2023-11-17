import {createSlice} from '@reduxjs/toolkit'

const videoSlide= createSlice (
   {
    name:"videos",
    initialState: {
        videos: {
            videos: [],
            isFetching: false,
            error: false
        },
        videoById: {
            video: [],
            isFetching: false,
            error: false,
        },
        videoSimillarById: {
            videoSimillar: [],
            isFetching: false,
            error: false,
        },
        videoAllChannelById: {
            videoChannel: [],
            isFetching: false,
            error: false,
        },
        msg:"",
    },
    reducers: { 
        getVideosStart: (state) => {
            state.videos.isFetching = true;

        },
        getVideosSuccess: (state,action) => {
            state.videos.isFetching = false;
            state.videos.videos = action.payload;
            state.videos.error = false;
        },
        getVideosFailed: (state) => {
            state.videos.isFetching = true
            
        },

        getVideoByIdStart: (state) => {
            state.videoById.isFetching = true;

        },
        getVideoByIdSuccess: (state,action) => {
            state.videoById.isFetching = false;
            state.videoById.video = action.payload;
            state.videoById.error = false;
        },
        getVideoByIdFailed: (state) => {
            state.videoById.isFetching = true
            
        },
        uploadVideosStart: (state) => {
            state.videos.isFetching = true;

        },
        uploadVideosSuccess: (state) => {
            state.videos.isFetching = false;
            state.videos.error = false;
        },
        uploadVideosFailed: (state) => {
            state.videos.isFetching = true
            
        },
        getVideoSimilarByIdStart: (state) => {
            state.videoSimillarById.isFetching = true;

        },
        getVideoSimilarByIdSuccess: (state,action) => {
            state.videoSimillarById.isFetching = false;
            state.videoSimillarById.videoSimillar = action.payload;
            state.videoSimillarById.error = false;
        },
        getVideoSimilarByIdFailed: (state) => {
            state.videoSimillarById.isFetching = true
            
        },
        getVideoAllChannelByIdStart: (state) => {
            state.videoAllChannelById.isFetching = true;

        },
        getVideoAllChannelByIdSuccess: (state,action) => {
            state.videoAllChannelById.isFetching = false;
            state.videoAllChannelById.videoChannel = action.payload;
            state.videoAllChannelById.error = false;
        },
        getVideoAllChannelByIdFailed: (state) => {
            state.videoAllChannelById.isFetching = true
            
        },
        videoViewStart: (state) => {
            state.videoById.isFetching = false;
        },
        videoViewSuccess: (state) => {
            state.videoById.isFetching = false;
            state.videoById.error = false;
        },
        videoViewFail: (state) => {
            state.videoById.isFetching = false;
            state.videoById.error = false;
        },
        totalVideoViewStart: (state) => {
            state.videoById.isFetching = false;
        },
        totalVideoViewSuccess: (state,action) => {
            state.videoById.isFetching = false;
            state.msg = action.payload;
            state.videoById.error = false;
        },
        totalVideoViewFail: (state) => {
            state.videoById.isFetching = false;
            state.videoById.error = true;
        },
    }
   }
)
export const {
    getVideosFailed,
    getVideosStart,
    getVideosSuccess,
    getVideoByIdFailed,
    getVideoByIdStart,
    getVideoByIdSuccess,
    uploadVideosFailed,
    uploadVideosStart,
    uploadVideosSuccess,
    getVideoSimilarByIdFailed,
    getVideoSimilarByIdSuccess,
    getVideoSimilarByIdStart,
    getVideoAllChannelByIdFailed,
    getVideoAllChannelByIdStart,
    getVideoAllChannelByIdSuccess,
    videoViewStart,
    videoViewFail,
    videoViewSuccess,
    totalVideoViewSuccess,
    totalVideoViewFail,
    totalVideoViewStart

} = videoSlide.actions

export default videoSlide.reducer