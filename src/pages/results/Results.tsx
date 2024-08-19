import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getPage, getRecipes } from "../../data/api"
import { useSearch } from "../../hooks/useSearch"
import "./results.css"

// req being sent twice
const Results: React.FC = () => {
  const navigate = useNavigate()
  const { query, results, urls } = useSelector((state: any) => state.search)
  const [updateQuery, updateUrls, updateResults] = useSearch()
  const [searchQuery, setSearchQuery] = useState<string>("")
  //const [loading, setLoading] = useState<boolean>(false)

  console.log("query", query)
  console.log("results", results)
  console.log("urls", urls)

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

  const handlePagination = useCallback(
    async (url: string) => {
      await getPage(url)
        .then((response) => {
          updateUrls(response.request.responseURL)
          updateResults(response.data)
        })
        .catch((error) => alert(error))
    },
    [updateResults, updateUrls],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchQuery && event.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch, searchQuery],
  )

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
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
      {results.data &&
      Array.isArray(results.data.hits) &&
      results.data.hits.length !== 0 ? (
        results.data.hits.map((result: any) => (
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
        {urls.length > 1 && (
          <button
            className="results-pagination-button"
            onClick={() => {
              handlePagination(urls[urls.length - 1])
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
          >
            Previous
          </button>
        )}
        {results.data && results.data._links.next && (
          <button
            className="results-pagination-button"
            onClick={() => {
              handlePagination(results.data._links.next.href)
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
          >
            Next
          </button>
        )}
      </div>
      <div className="results-footer">
        <p className="results-footer-text">Powered by Edamam</p>
      </div>
    </div>
  )
}

export default Results
