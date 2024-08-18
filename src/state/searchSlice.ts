import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: {},
    urls: [],
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
    setUrls: (state, action) => {
      state.urls = action.payload
    },
  },
})

export const { setQuery, setResults, setUrls } = searchSlice.actions
export default searchSlice.reducer
