import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../apis/request";
import { MY_TEAMS_URL, USERS_URL } from "../../apis/constant";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(USERS_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTeamUsers = createAsyncThunk(
  "user/getAllTeamUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${MY_TEAMS_URL}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest(USERS_URL, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(USERS_URL, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await putRequest(`${USERS_URL}/${payload.id}`, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    teamUsers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.user.id
        );
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.user.id ? action.payload.user : user
        );
      })
      .addCase(getAllTeamUsers.fulfilled, (state, action) => {
        state.teamUsers = action.payload.users;
      });
  },
});

export const { setLoading, setUser } = userSlice.actions;

export default userSlice.reducer;
