import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    queryResults: [],
    nextUrl: "",
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setQueryResults: (state, action) => {
      state.queryResults = action.payload
    },
    setNextUrl: (state, action) => {
      state.nextUrl = action.payload
    },
    resetState: (state) => {
      state.query = ""
      state.queryResults = []
      state.nextUrl = ""
    },
  },
})

export const { setQuery, setQueryResults, setNextUrl, resetState } =
  searchSlice.actions
export default searchSlice.reducer
