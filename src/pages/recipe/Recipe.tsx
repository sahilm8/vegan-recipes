import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getRecipeData } from "../../utils/api"
import "./recipe.css"

const Recipe: React.FC = () => {
  const { uri } = useParams<{ uri: string }>()
  const [recipe, setRecipe] = useState<any>({
    label: "123",
    image: "123",
    cuisineType: "123",
    dishType: "123",
    mealType: "123",
  })


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
        <p className="recipe-heading">{recipe.label}</p>
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <p className="recipe-sub-heading">{recipe.cuisineType}</p>
        <p className="recipe-sub-heading">{recipe.dishType}</p>
        <p className="recipe-sub-heading">{recipe.mealType}</p>
      </div>
    </div>
  )
}

export default Recipe
