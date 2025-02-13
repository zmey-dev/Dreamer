import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../apis/request";
import { TEAMS_URL } from "../../apis/constant";

export const getAllTeams = createAsyncThunk(
  "team/getAllTeams",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(TEAMS_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest(TEAMS_URL, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(TEAMS_URL, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await putRequest(`${TEAMS_URL}/${payload.id}`, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.teams = action.payload.teams;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload.team);
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter(
          (team) => team.id !== action.payload.team.id
        );
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.teams = state.teams.map((team) =>
          team.id === action.payload.team.id ? action.payload.team : team
        );
      });
  },
});

export const { setLoading, setUser } = teamSlice.actions;

export default teamSlice.reducer;
