import { useDispatch, useSelector } from "react-redux"
import { getResults, getMoreResults } from "../data/api"
import { setQuery, setQueryResults, setNextUrl } from "../state/searchSlice"

export const useSearch = () => {
  const dispatch = useDispatch()
  const { queryResults } = useSelector((state: any) => state.search)

  const getRecipes = async (query: string) => {
    await getResults(query)
      .then((response) => {
        console.log("response", response)
        dispatch(setQuery(query))
        dispatch(setQueryResults([...queryResults, response.data.hits]))
        dispatch(setNextUrl(response.data._links.next.href))
      })
      .catch((error) => alert(error))
  }

  const getMoreRecipes = async (nextUrl: string) => {
    await getMoreResults(nextUrl)
      .then((response) => {
        console.log("response", response)
        dispatch(setQueryResults([...queryResults, response.hits]))
      })
      .catch((error) => alert(error))
  }

  return [getRecipes, getMoreRecipes]
}
