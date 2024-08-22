import axios from "axios"

// Todo: Hide app_id and app_key in dev tools
export const getResults = async (query: string): Promise<any> => {
  const url = `${process.env.REACT_APP_EDAMAM_BASE_URL}/api/recipes/v2`
  const params = {
    q: query,
    app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
    type: "public",
    health: "vegan",
  }

  try {
    const response = await axios.get(url, { params })
    return response
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}

export const getMoreResults = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url)
    return response
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}

export const getData = async (uri: string): Promise<any> => {
  const url = `${process.env.REACT_APP_EDAMAM_BASE_URL}/api/recipes/v2/${uri}`
  const params = {
    app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
    type: "public",
  }
  try {
    const response = await axios.get(url, { params })
    return response
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "An unknown error occurred" }
  }
}
