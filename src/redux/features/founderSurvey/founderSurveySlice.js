import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import axiosInstance from "../../../Helper/Helper";

export const fetchSurveyQuestion = createAsyncThunk(
  "survey/fetchQuestion",
  async () => {
    try {
      const response = await axiosInstance.post("get-founder-survey-question");
      const responseData = response.data;

      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

export const submitSurveyAnswer = createAsyncThunk(
  "survey/submitAnswer",
  async ({ QID, AnsID, AnsString }, { rejectWithValue }) => {
    try {
      let values;
      if (AnsID !== undefined && !Array.isArray(AnsID)) {
    
        values = [QID, parseInt(AnsID, 10)];
      } else if (Array.isArray(AnsID)) {
     
        values = [QID, ...AnsID.map((id) => parseInt(id, 10))];
      } else if (AnsString !== undefined) {
        values = [QID, AnsString];
      } else {
        throw new Error("Invalid answer format");
      }

      const response = await axiosInstance.post(
        "/submit-founder-survey-answer",
        { values }
      );
      const responseData = response.data;
      return responseData;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        throw error;
      }
    }
  }
);

export const fetchPreviousQuestion = createAsyncThunk(
  "/get-previousQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/get-previQuestion", {
        questionId,
      });
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  question: null,
  isComplete: null,
  loading: "idle",
  error: null,
  mandatory: null,
};

const founderSurveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchSurveyQuestion

      .addCase(fetchSurveyQuestion.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchSurveyQuestion.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = "success";
        if (payload && payload.message === "SurveyCompleted") {
          console.log(payload);
          state.status = "success";
          state.isComplete = true;
        } else if (payload) {
          state.question = payload[0];
        }
      })

      .addCase(fetchSurveyQuestion.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })

      //submitSurveyAnswer

      .addCase(submitSurveyAnswer.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(submitSurveyAnswer.fulfilled, (state, { payload }) => {
        state.loading = "success";
        if (payload && payload.message === "SurveyCompleted") {
          console.log(payload);
          state.loading = "success";
          state.isComplete = true;
        } else if (payload) {
          state.question = payload[0];
        }
      })

      .addCase(submitSurveyAnswer.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
        // toast.error(payload.message);
      })

      //fetchPreviousQuestion

      .addCase(fetchPreviousQuestion.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchPreviousQuestion.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = "success";
        state.question = payload[0];
        state.error = null;
        // toast.error(payload.message);
      })
      .addCase(fetchPreviousQuestion.rejected, (state, { payload }) => {
        state.loading = "idle";
        // state.error = payload.message;
        // toast.error(payload.message);
      });
  },
});

export default founderSurveySlice.reducer;
