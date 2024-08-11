import React, { useState } from "react"
import { getRecipesResults } from "../../utils/api"
import "./home.css"

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = () => {
    getRecipesResults(searchQuery, 0, 10)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="home-root">
      <div className="header">
        <p className="heading">Vegan Recipes</p>
        <p className="sub-heading">Find your next favourite vegan dish!</p>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="footer">
        <p className="footer-text">Powered by XYZ</p>
        <p className="footer-text">Created by Sahil Memon</p>
      </div>
    </div>
  )
}

export default Home
