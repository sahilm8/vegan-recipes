import { useDispatch, useSelector } from "react-redux"
import { setQuery, setResults, setUrls } from "../state/searchSlice"

export const useSearch = () => {
  const dispatch = useDispatch()
  const { urls } = useSelector((state: any) => state.search)

  const updateQuery = (query: string) => {
    dispatch(setQuery(query))
  }

  const updateResults = (results: Object) => {
    dispatch(setResults(results))
  }

  const updateUrls = (url: string) => {
    if (!urls.includes(url)) {
      dispatch(setUrls([...urls, url]))
    }
  }

  return [updateQuery, updateResults, updateUrls]
}
