import { toast } from "react-toastify";
import axiosInstance from "../../../Helper/Helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "/login",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await axiosInstance.post("/login", formData);
      return res;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        throw error;
      }
    }
  }
);

//registration

export const registration = createAsyncThunk(
  "auth/registration",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const res = await axiosInstance.post("/founder-register", formData);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        throw error;
      }
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  "/verify-register-emailotp",
  async (emailOtpFormData, { rejectWithValue }) => {
    // console.log(formData);
    try {
      const res = await axiosInstance.post(
        "/verify-register-emailotp",
        emailOtpFormData
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        throw error;
      }
    }
  }
);

export const changeMyPassword = createAsyncThunk(
  "/changeMyPassword",
  async (mobileOtpFormData, { rejectWithValue }) => {
    // console.log(formData);
    try {
      const res = await axiosInstance.post(
        "/changeMyPassword",
        mobileOtpFormData
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        throw error;
      }
    }
  }
);

export const verifyMobileOtp = createAsyncThunk(
  "/verify-foundermobile-otp",
  async (mobileOtpFormData, { rejectWithValue }) => {
    console.log(mobileOtpFormData);
    try {
      const res = await axiosInstance.post(
        "/verify-foundermobile-otp",
        mobileOtpFormData
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        throw error;
      }
    }
  }
);

export const resendEmailOtp = createAsyncThunk(
  "/resend-register-emailotp",
  async (mobileOtpFormData, { rejectWithValue }) => {
    console.log(mobileOtpFormData);
    try {
      const res = await axiosInstance.post(
        "/resend-register-emailotp",
        mobileOtpFormData
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        // For other errors, rethrow the error
        throw error;
      }
    }
  }
);

export const linkedInFetch = createAsyncThunk(
  "/linkdinfetch",
  async (linkedInProf, { rejectWithValue }) => {
    console.log(linkedInProf);
    try {
      const res = await axiosInstance.post("/linkdinfetch", linkedInProf);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized specifically
        const errorData = error.response.data;
        console.error("Unauthorized:", errorData.message);
        return rejectWithValue(errorData);
      } else {
        // For other errors, rethrow the error
        throw error;
      }
    }
  }
);

const initialState = {
  status: "",
  error: null,
  token: null,
  regID: null,
  redirect: null,
  linkedInProf: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset_redirectToUpdate: (state, { payload }) => {
      state.redirect = payload;
    },
    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("registrationFormData");
      localStorage.removeItem("mobile");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("date_survey_completed");
      toast.success("Logout Successfully");
    },
  },

  extraReducers: (builder) => {
    builder
      //* Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const userDetails = payload.data;

        // console.log(payload);
        if (payload.status === 200) {
          state.redirect = "/founder";
          localStorage.setItem("access_token", userDetails.access_token);
          localStorage.setItem("name", userDetails.user_info.name);
          localStorage.setItem("email", userDetails.user_info.email);
          localStorage.setItem("mobile", userDetails.user_info.contact_no);
          localStorage.setItem(
            "date_survey_completed",
            userDetails.user_info.date_survey_completed
          );
          toast.success("Login Successfully ");
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload?.message;
        toast.error(payload?.message);
      })

      //sign up

      .addCase(registration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        console.log("Registration Fulfilled Payload:", payload);

        if (payload && payload.access_token) {
          state.status = payload.status;
          const token = payload.access_token;
          // const regID = payload.regID;

          if (payload.status === "success") {
            state.redirect = "/verify";

            try {
              localStorage.setItem("access_token", token);

              console.log("Access token stored successfully.");
            } catch (error) {
              console.error(
                "Error storing access token in localStorage:",
                error
              );
            }
          }
        } else {
          console.error("Invalid payload structure or missing access_token.");
        }
      })

      .addCase(registration.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload.message;
        toast.error(payload.message);
      })

      //verifyEmail Otp registration
      .addCase(verifyEmailOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyEmailOtp.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = payload.status;
      })
      .addCase(verifyEmailOtp.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload.message;
        toast.error(payload.message);
      })

      //verifyMobile Otp registration

      .addCase(verifyMobileOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyMobileOtp.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = payload.status;
      })
      .addCase(verifyMobileOtp.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload.message;
        toast.error(payload.message);
      })

      //changeMyPassword

      .addCase(changeMyPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeMyPassword.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = payload.status;
      })
      .addCase(changeMyPassword.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload.message;
        toast.error(payload.message);
      })

      //Resend Email otp

      .addCase(resendEmailOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resendEmailOtp.fulfilled, (state, { payload }) => {
        state.status = "success";
        console.log(payload);
        state.status = payload.status;
      })
      .addCase(resendEmailOtp.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload.message;
        toast.error(payload.message);
      })

      //LinkedIn Verification

      .addCase(linkedInFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(linkedInFetch.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = payload.status;
      })
      .addCase(linkedInFetch.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload.message;
        toast.error(payload.message);
      });
  },
});

export const { reset_redirectToUpdate, logout } = authSlice.actions;

export default authSlice.reducer;
