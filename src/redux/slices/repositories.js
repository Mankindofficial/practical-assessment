import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRepositories = createAsyncThunk(
  "repositories/getRepositories",
  async (repo) => {
    return fetch(`https://api.github.com/search/repositories?q=${repo}`).then(
      (res) => res.json()
    );
  }
);

export const getIssues = createAsyncThunk(
  "repositories/getIssues",
  async (issue_url) => {
    return fetch(issue_url).then((res) => res.json());
  }
);

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: {
    list: [],
    issues: [],
    status: null,
  },

  reducers: {
    updateActiveRepo: (state, { payload }) => {
      state.activeRepoName = payload;
    },
  },
  extraReducers: {
    [getRepositories.pending]: (state) => {
      state.status = "loading";
    },
    [getRepositories.fulfilled]: (state, { payload }) => {
      state.list = payload.items;
      state.issues = [];
      state.status = "success";
    },
    [getRepositories.rejected]: (state) => {
      state.status = "failed";
    },
    [getIssues.pending]: (state) => {
      state.status = "loading";
    },
    [getIssues.fulfilled]: (state, { payload }) => {
      state.issues = payload;
      state.status = "success";
    },
    [getIssues.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { updateActiveRepo } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
