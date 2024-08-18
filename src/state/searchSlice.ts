import { createSlice } from "@reduxjs/toolkit"

export interface searchState {
  query: string
  results: Object
}

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: {},
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
  },
})

export const { setQuery, setResults } = searchSlice.actions
export default searchSlice.reducer
