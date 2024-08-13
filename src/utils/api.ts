import axios from "axios"

export const getRecipes = async (
  query: string,
  from: number,
  to: number,
): Promise<any> => {
  const url = `${process.env.REACT_APP_EDAMAM_BASE_URL}/api/recipes/v2`
  const params = {
    q: query,
    app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
    type: "public",
    health: "vegan",
    from: from,
    to: to,
  }

  try {
    const response = await axios.get(url, { params })
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}

export const getRecipeData = async (uri: string): Promise<any> => {
  const url = `${process.env.REACT_APP_EDAMAM_BASE_URL}/api/recipes/v2/${uri}`
  const params = {
    app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
    type: "public",
  }
  try {
    const response = await axios.get(url, { params })
    return response.data
  }
  catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}
