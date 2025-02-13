import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../apis/request";
import {
  LOGIN_URL,
  LOGOUT_URL,
  UPDATE_PASSWORD_URL,
  UPDATE_PROFILE_URL,
} from "../../apis/constant";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await postRequest(LOGIN_URL, { email, password });
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const data = await postRequest(LOGOUT_URL);
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await putRequest(UPDATE_PROFILE_URL, payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await putRequest(UPDATE_PASSWORD_URL, payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;
