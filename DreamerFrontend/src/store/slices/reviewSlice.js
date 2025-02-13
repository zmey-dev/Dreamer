import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../apis/request";
import { MY_REVIEWS_URL, REVIEWS_URL } from "../../apis/constant";

export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(REVIEWS_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyReviews = createAsyncThunk(
  "review/getMyReviews",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${MY_REVIEWS_URL}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${REVIEWS_URL}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReviewForUser = createAsyncThunk(
  "review/createReviewForUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest(`${REVIEWS_URL}/user`, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReviewForProject = createAsyncThunk(
  "review/createReviewForProject",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest(`${REVIEWS_URL}/project`, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    MyReviews: [], //that I received
    reviews: [], //that I submitted
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.MyReviews = action.payload.review;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.review;
      })
      .addCase(createReviewForUser.fulfilled, (state, action) => {
        // state.reviews = action.payload.review;
      })
      .addCase(createReviewForProject.fulfilled, (state, action) => {
        // state.reviews = action.payload.review;
      });
  },
});

export default reviewSlice.reducer;
