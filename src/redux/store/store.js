import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import founderSurveySlice from "../features/founderSurvey/founderSurveySlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    survey: founderSurveySlice,
  },
});
export default store;
