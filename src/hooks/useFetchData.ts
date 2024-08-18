import { getRecipes, getPage, getRecipeData } from "../data/api"

export const useFetchData = () => {
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
