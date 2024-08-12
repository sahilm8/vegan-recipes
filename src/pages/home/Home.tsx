import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./home.css"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = () => {
    navigate(`/results/${searchQuery}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

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
        <p className="home-footer-text">Created by Sahil Memon</p>
      </div>
    </div>
  )
}

export default Home
