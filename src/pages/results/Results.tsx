import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getNextPage, getRecipes } from "../../utils/api"
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
        setResults(data)
      })
      .catch((error) => alert(error))
  }

  const handlePagination = (url: string) => {
    getNextPage(url)
      .then((data) => {
        setResults(data)
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
      {results && Array.isArray(results.hits) && results.hits.length !== 0 ? (
        results.hits.map((result: any) => (
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
      <div className="results-pagination">
        <button className="results-pagination-button" onClick={() => {}}>
          Previous
        </button>
        {results && results._links.next.href ? (
          <button
            className="results-pagination-button"
            onClick={() =>
              results._links.next.href
                ? (handlePagination(results._links.next.href),
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  }))
                : null
            }
          >
            Next
          </button>
        ) : null}
      </div>
      <div className="results-footer">
        <p className="results-footer-text">Powered by Edamam</p>
      </div>
    </div>
  )
}

export default Results
