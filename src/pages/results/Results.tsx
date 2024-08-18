import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setQuery, setResults } from "../../state/searchSlice"
import { useSaveReqUrl } from "../../hooks/useSaveReqUrl"
import { useFetchData } from "../../hooks/useFetchData"
import "./results.css"

const Results: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [saveUrl] = useSaveReqUrl()
  const [handleGetReipes, handleGetPage] = useFetchData()
  const { query } = useSelector((state: any) => state.search)
  const { urls } = useSelector((state: any) => state.search)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [data, setData] = React.useState<any>(null)

  console.log("urls", urls)

  const handleSearch = useCallback(
    (searchQuery: string) => {
      dispatch(setQuery(searchQuery))
      navigate(`/results/${searchQuery}`)
      handleGetReipes(searchQuery)
        .then((data) => {
          setData(data)
          dispatch(setResults(data))
        })
        .catch((error) => alert(error))
    },
    [navigate, dispatch],
  )

  const handlePagination = useCallback(
    (url: string) => {
      saveUrl(url)
      handleGetPage(url)
        .then((data) => {
          setData(data)
          dispatch(setResults(data))
        })
        .catch((error) => alert(error))
    },
    [dispatch, saveUrl],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchQuery && event.key === "Enter") {
        handleSearch(searchQuery)
      }
    },
    [handleSearch, searchQuery],
  )

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      handleSearch(query)
    }
  }, [query, handleSearch])

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
      {data && Array.isArray(data.hits) && data.hits.length !== 0 ? (
        data.hits.map((result: any) => (
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
        {urls.length !== 0 && (
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
        {data && data._links.next && (
          <button
            className="results-pagination-button"
            id="results-pagination-button-next"
            onClick={() => {
              handlePagination(data._links.next.href)
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
