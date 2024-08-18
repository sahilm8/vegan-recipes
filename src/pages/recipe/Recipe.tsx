import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipeData } from "../../data/api"
import "./recipe.css"

const Recipe: React.FC = () => {
  const navigate = useNavigate()
  const { uri } = useParams<{ uri: string }>()
  const [recipe, setRecipe] = useState<any>(null)

  useEffect(() => {
    getRecipeData(uri!)
      .then((data) => {
        setRecipe(data.recipe)
      })
      .catch((error) => alert(error))
  }, [uri])

  return recipe ? (
    <div className="recipe-root">
      <div className="recipe-header">
        <p className="recipe-heading" onClick={() => navigate("/")}>
          Vegan Recipes
        </p>
        <p className="recipe-sub-heading">{recipe.label}</p>
        <div className="recipe-info-section">
          <img src={recipe.image} alt={recipe.label} className="recipe-image" />
          <div>
            <p className="recipe-section-heading">Cuisine</p>
            <p className="recipe-info">{recipe.cuisineType[0]}</p>
            <p className="recipe-section-heading">Health Labels</p>
            {recipe.healthLabels.map((label: any, index: number) => (
              <p className="recipe-info" key={index}>
                {label}
              </p>
            ))}
            <p className="recipe-section-heading">Ingredients</p>
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <div className="recipe-ingredient-container" key={index}>
                <img
                  src={ingredient.image}
                  alt={ingredient.text}
                  className="recipe-ingredient-image"
                />
                <p className="recipe-info">{ingredient.text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="recipe-link-heading">Source</p>
        <a href={recipe.url} className="recipe-link">
          {recipe.url}
        </a>
      </div>
    </div>
  ) : null
}

export default Recipe
