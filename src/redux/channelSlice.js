import {createSlice} from '@reduxjs/toolkit'

const channelSlide= createSlice (
   {
    name:"channels",
    initialState: {
        channel: {
            channel: [],
            isFetching: false,
            error: false
        },
        allChannel: {
            allChannel: [],
            isFetching: false,
            error: false
        },
        CreateChannel: {
            Channel: [],
            isFetching: false,
            error: false
        },
        subscribed: false,
    },
    reducers: { 
        getChannelStart: (state) => {
            state.channel.isFetching = true;

        },
        getChannelSuccess: (state,action) => {
            state.channel.isFetching = false;
            state.channel.channel = action.payload;
            state.channel.error = false;
        },
        getChannelFailed: (state) => {
            state.channel.isFetching = true
            
        },
        getChannelAllByUserStart: (state) => {
            state.allChannel.isFetching = true;

        },
        getChannelAllByUserSuccess: (state,action) => {
            state.allChannel.isFetching = false;
            state.allChannel.allChannel = action.payload;
            state.allChannel.error = false;
        },
        getChannelAllByUserFail: (state) => {
            state.allChannel.isFetching = true
            
        },
        createChannelStart: (state) => {
            state.CreateChannel.isFetching = true;

        },
        createChannelSuccess: (state,action) => {
            state.CreateChannel.isFetching = false;
            state.CreateChannel.Channel = action.payload;
            state.CreateChannel.error = false;
        },
        createChannelFailed: (state) => {
            state.channel.isFetching = true
        },
        subsChannelStart: (state) => {
            state.channel.isFetching = true;

        },
        subsChannelSuccess: (state,action) => {
            state.channel.isFetching = false;
            state.subscribed = true;
            state.channel.error = false;
        },
        subsChannelFailed: (state) => {
            state.channel.isFetching = true
        },
        unSubsChannelStart: (state) => {
            state.channel.isFetching = true;

        },
        unSubsChannelSuccess: (state) => {
            state.channel.isFetching = false;
            state.subscribed = false;
            state.channel.error = false;
        },
        unSubsChannelFailed: (state) => {
            state.channel.isFetching = true
            state.channel.error = true
        },
    }
   }
)
export const {
    getChannelFailed,
    getChannelStart,
    getChannelSuccess,
    getChannelAllByUserFail,
    getChannelAllByUserStart,
    getChannelAllByUserSuccess,
    createChannelFailed,
    createChannelStart,
    createChannelSuccess,
    subsChannelFailed,
    subsChannelStart,
    subsChannelSuccess,
    unSubsChannelFailed,
    unSubsChannelStart,
    unSubsChannelSuccess
} = channelSlide.actions

export default channelSlide.reducer