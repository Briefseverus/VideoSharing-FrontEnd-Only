import { createCategoryFailed, createCategoryStart, createCategorySuccess, getCategoriesFailed, getCategoriesStart, getCategoriesSuccess, getCategoryFail, getCategoryStart, getCategorySuccess } from "../categoriesSlice";
import axios from 'axios'
export const getCategories = async (accessToken, dispatch) => {
    dispatch(getCategoriesStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/categories`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(getCategoriesSuccess(res.data));
    } catch (err) {
        dispatch(getCategoriesFailed());
    }
};
export const getCategoryById = async (accessToken, categoryId, dispatch) => {
    dispatch(getCategoryStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/categories/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(getCategorySuccess(res.data));
    } catch (err) {
        dispatch(getCategoryFail());
    }
};
export const setCategoryForVideo = async (dispatch,categoryData,accessToken) => {
    dispatch(createCategoryStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/video-categories-mapping`, categoryData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(createCategorySuccess(res.data));
    } catch (err) {
        dispatch(createCategoryFailed());
    }
};