import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./home.css"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = useCallback(async () => {
    navigate(`/results/${searchQuery}`)
  }, [navigate, searchQuery])

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
