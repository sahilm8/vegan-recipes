import axios from "axios"

export const getRecipesResults = (
  query: string,
  from: number,
  to: number,
): Promise<any> => {
  const url = `${process.env.REACT_APP_EDAMAM_BASE_URL}/search`
  const params = {
    q: query,
    app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
    health: "vegan",
    from: from,
    to: to,
  }

  return axios
    .get(url, { params })
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((error) => {
      throw new Error("Failed to fetch recipes")
    })
}
