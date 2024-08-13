import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipes } from "../../utils/api"
import "./results.css"

const Results: React.FC = () => {
  const navigate = useNavigate()
  const { query } = useParams<{ query: string }>()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [results, setResults] = React.useState<any>(null)

  useEffect(() => {
    if (query) {
      handleSearch(query)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    getRecipes(searchQuery, 0, 50)
      .then((data) => {
        setResults(data.hits)
      })
      .catch((error) => alert(error))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery && event.key === "Enter") {
      handleSearch(searchQuery)
    }
  }

  return (
    <div className="results-root">
      <div className="results-header">
        <p className="results-heading" onClick={() => navigate("/")}>
          Vegan Recipes
        </p>
        <input
          type="text"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="results-search-bar"
          onKeyDown={handleKeyDown}
        />
        <button
          className="results-search-button"
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </div>
      {Array.isArray(results) && results.length !== 0 ? (
        results.map((result) => (
          <div
            className="results-row"
            key={result.recipe.url}
            onClick={() =>
              navigate(`/recipe/${result.recipe.uri.split("_")[1]}`)
            }
          >
            <img
              className="results-image"
              src={result.recipe.image}
              alt={result.recipe.label}
            />
            <p className="results-recipe-title">{result.recipe.label}</p>
          </div>
        ))
      ) : (
        <p className="results-no-results">
          No recipes found, please try again later.
        </p>
      )}
      <div className="results-footer">
        <p className="results-footer-text">Powered by Edamam</p>
        <p className="results-footer-text">Created by Sahil Memon</p>
      </div>
    </div>
  )
}

export default Results
