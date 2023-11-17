import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from '../authSlice'
import { getUserStart, getUserVipStart, getUsersFailed, getUsersSuccess, getUsersVipSuccess } from '../userSlide'

export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}login`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    }catch(err){
        console.error(err);
        dispatch(loginFailed());
    }
};
export const registerUser = async(user,dispatch,navigate) => {
    dispatch(registerStart());
    try{
        await axios.post(`login/sign-up`, user);
        dispatch(registerSuccess())
        navigate('/login')
    }catch(err){
        dispatch(registerFailed())
    };
};
export const getUser = async(accessToken, id,dispatch) => {
    dispatch(getUserStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/users/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getUsersSuccess(res.data))
    }catch(err) {
        dispatch(getUsersFailed())
    }
};
export const getVipUser = async(accessToken, dispatch,navigate ) => {
    dispatch(getUserVipStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/users/buy-vip`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getUsersVipSuccess(res.data))
        const paymentUrl = res.data

        window.location.href = paymentUrl
    }catch(err) {
        dispatch(getUsersFailed())
    }
};
// export const getUser = async(dispatch,accessToken) {

// }
// export const deleteUser = async(accessToken,dispatch,id,axiosJWT) => {
//     dispatch(deleteUsersStart());
//     try {
//         const res = await axiosJWT.delete(`${process.env.REACT_APP_BACKEND_URL}user/delete/`+ id, {
//             headers: {token: `${accessToken}`}
//         })
//         dispatch(deleteUsersSuccess(res.data))
//     } catch (error) {
//         dispatch(deleteUsersFailed(error.response.data))
//     }
// }
export const logOut = async (dispatch, navigate, ) => {
    dispatch(logoutStart());
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}logout`);
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailed());
    }
  };