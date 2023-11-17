import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice(
    {
        name: "users",
        initialState: {
            user: {
                user: null,
                isFetching: false,
                error: false
            },
            msg:"",
        },
        reducers: {
            getUserStart: (state) => {
                state.user.isFetching = true;
            },
            getUsersSuccess: (state,action) => {
                state.user.isFetching = false;
                state.user.user = action.payload;
            },
            getUsersFailed: (state) => {
                state.user.isFetching = false;
                state.user.error = true;
            },
            getUserVipStart: (state) => {
                state.user.isFetching = true;
            },
            getUsersVipSuccess: (state,action) => {
                state.user.isFetching = false;
                state.msg = action.payload;
            },
            getUsersVipFailed: (state) => {
                state.user.isFetching = false;
                state.user.error = true;
            },
            // deleteUsersStart: (state) => {
            //     state.users.isFetching = true;
            // },
            // deleteUsersSuccess: (state, action) =>  {
            //     state.users.isFetching = false;
            //     state.msg = action.payload
            // },
            // deleteUsersFailed: (state,action) => {
            //     state.users.isFetching = false;
            //     state.users.error = true;
            //     state.msg = action.payload
            // }
        }
});

export const {
  getUserStart,
  getUsersFailed,
  getUsersSuccess,
  getUserVipStart,
  getUsersVipFailed,
  getUsersVipSuccess
} = userSlide.actions;

export default userSlide.reducer;
