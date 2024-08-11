import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./results.css"
import { getRecipes } from "../../utils/api"

const Results: React.FC = () => {
  const navigate = useNavigate()
  const { query } = useParams<{ query: string }>()
  const [results, setResults] = React.useState<any[]>([])

  useEffect(() => {
    getRecipes(query!, 0, 50).then((data) => {
      setResults(data)
    })
  }, [query])

  return (
    <div className="results-root">
      <div className="results-header">
        <p className="results-heading" onClick={() => navigate("/")}>
          Vegan Recipes
        </p>
        <input
          type="text"
          placeholder="Search for recipes"
          value={""}
          onChange={(e) => {}}
          className="results-search-bar"
          onKeyDown={() => {}}
        />
        <button className="results-search-button" onClick={() => {}}>
          Search
        </button>
      </div>
      <div className="results-list">
        {Array.isArray(results) && results.length !== 0 ? (
          results.map((result) => (
            <div className="results-row">
              <p className="results-recipe-title">{result.title}</p>
            </div>
          ))
        ) : (
          <p className="results-no-results">
            No recipes found, please try again later.
          </p>
        )}
      </div>
    </div>
  )
}

export default Results
