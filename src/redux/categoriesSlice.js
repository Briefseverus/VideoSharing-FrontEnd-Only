import {createSlice} from '@reduxjs/toolkit'
const categoriesSlide= createSlice (
    {
     name:"categories",
     initialState: {
         category: {
             category: [],
             isFetching: false,
             error: false
         },
         categories: {
             categories: [],
             isFetching: false,
             error: false
         },
         createCategory: {
             category: [],
             isFetching: false,
             error: false
         },
         msg: "",
     },
     reducers: { 
         getCategoriesStart: (state) => {
             state.categories.isFetching = true;
 
         },
         getCategoriesSuccess: (state,action) => {
             state.categories.isFetching = false;
             state.categories.categories = action.payload;
             state.categories.error = false;
         },
         getCategoriesFailed: (state) => {
             state.categories.isFetching = true
             
         },
         getCategoryStart: (state) => {
             state.category.isFetching = true;
 
         },
         getCategorySuccess: (state,action) => {
             state.category.isFetching = false;
             state.category.category = action.payload;
             state.category.error = false;
         },
         getCategoryFail: (state) => {
             state.category.isFetching = true
             
         },
         createCategoryStart: (state) => {
             state.createCategory.isFetching = true;
 
         },
         createCategorySuccess: (state,action) => {
             state.createCategory.isFetching = false;
             state.createCategory.category = action.payload;
             state.createCategory.error = false;
         },
         createCategoryFailed: (state) => {
             state.channel.isFetching = true
             state.createCategory.error = true;

         },
         
     }
    }
 )
 export const {
     getCategoryFail,
     getCategoryStart,
     getCategorySuccess,
     getCategoriesFailed,
     getCategoriesStart,
     getCategoriesSuccess,
     createCategoryFailed,
     createCategoryStart,
     createCategorySuccess
 } = categoriesSlide.actions
 
 export default categoriesSlide.reducer