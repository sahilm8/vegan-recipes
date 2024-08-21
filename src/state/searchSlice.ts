import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    queryResults: [],
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setQueryResults: (state, action) => {
      state.queryResults = action.payload
    },
    resetState: (state) => {
      state.query = ""
      state.queryResults = []
    },
  },
})

export const { setQuery, setQueryResults, resetState } = searchSlice.actions
export default searchSlice.reducer
