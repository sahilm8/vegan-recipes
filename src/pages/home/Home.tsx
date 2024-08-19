import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSearch } from "../../hooks/useSearch"
import "./home.css"
import { getRecipes } from "../../data/api"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [updateQuery, updateUrls, updateResults] = useSearch()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = useCallback(async () => {
    await getRecipes(searchQuery)
      .then((response) => {
        updateQuery(searchQuery)
        updateUrls(response.request.responseURL)
        updateResults(response.data)
        navigate(`/results/${searchQuery}`)
      })
      .catch((error) => alert(error))
  }, [navigate, searchQuery, updateQuery, updateResults, updateUrls])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  return (
    <div className="home-root">
      <div className="home-header">
        <p className="home-heading">Vegan Recipes</p>
        <p className="home-sub-heading">Find your next favourite vegan dish!</p>
      </div>
      <div className="home-search">
        <input
          type="text"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="home-search-bar"
          onKeyDown={handleKeyDown}
        />
        <button className="home-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="home-footer">
        <p className="results-footer-text">Powered by Edamam</p>
      </div>
    </div>
  )
}

export default Home
