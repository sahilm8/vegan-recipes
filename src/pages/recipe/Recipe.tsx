import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipeData } from "../../utils/api"
import "./recipe.css"

const Recipe: React.FC = () => {
  const navigate = useNavigate()
  const { uri } = useParams<{ uri: string }>()
  const [recipe, setRecipe] = useState<any>({})

  useEffect(() => {
    getRecipeData(uri!)
      .then((data) => {
        setRecipe(data.recipe)
      })
      .catch((error) => alert(error))
  }, [uri])

  return (
    <div className="recipe-root">
      <div className="recipe-header">
        <p className="recipe-heading" onClick={() => navigate("/")}>
          Vegan Recipes
        </p>
        <p className="recipe-sub-heading">{recipe.label}</p>
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <p className="recipe-section-heading">Ingredients</p>
        {recipe.ingredients.map((ingredient: any) => (
          <div className="recipe-ingredient-container">
            <img
              src={ingredient.image}
              alt={ingredient.text}
              className="recipe-ingredient-image"
            />
            <p className="recipe-ingredient" key={ingredient.text}>
              {ingredient.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recipe
