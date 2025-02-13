import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../apis/request";
import { MY_TEAM_PROJECTS_URL, PROJECTS_URL } from "../../apis/constant";

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(PROJECTS_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTeamProjects = createAsyncThunk(
  "projects/getAllTeamProjects",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${MY_TEAM_PROJECTS_URL}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequest(PROJECTS_URL, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(PROJECTS_URL, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await putRequest(
        `${PROJECTS_URL}/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    teamProjects: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
      })
      .addCase(getAllTeamProjects.fulfilled, (state, action) => {
        state.teamProjects = action.payload.projects;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload.project);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload.project.id
        );
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((project) =>
          project.id === action.payload.project.id
            ? action.payload.project
            : project
        );
      });
  },
});

export default projectSlice.reducer;
