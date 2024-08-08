import React, { useState } from "react"
import "./home.css"

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")

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
        />
        <button className="search-button">Search</button>
      </div>
      <div className="footer">
        <p className="footer-text">Powered by XYZ</p>
        <p className="footer-text">Created by Sahil Memon</p>
      </div>
    </div>
  )
}

export default Home
