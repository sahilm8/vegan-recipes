import { useDispatch, useSelector } from "react-redux"
import { getRecipes, getPage, getRecipeData } from "../data/api"
import { setUrls } from "../state/searchSlice"

export const useFetchData = () => {
  const dispatch = useDispatch()
  const urls = useSelector((state: any) => state.search.urls)

  const saveUrl = (url: string) => {
    if (!urls.includes(url)) {
      dispatch(setUrls([...urls, url]))
    }
  }

  const handleGetReipes = async (query: string) => {
    try {
      const data = await getRecipes(query)
      return data
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message }
      }
      return { error: "An unknown error occurred" }
    }
  }

  const handleGetPage = async (url: string) => {
    try {
      const data = await getPage(url)
      return data
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message }
      }
      return { error: "An unknown error occurred" }
    }
  }

  const handleGetRecipeData = async (uri: string) => {
    try {
      const data = await getRecipeData(uri)
      return data
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message }
      }
      return { error: "An unknown error occurred" }
    }
  }

  return [handleGetReipes, handleGetPage, handleGetRecipeData]
}
