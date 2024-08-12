import React, { useState } from "react"
import { useParams } from "react-router-dom"
//import { getRecipeData } from "../../utils/api"
import "./recipe.css"

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<any>({})

  /*
  useEffect(() => {
    if (id) {
      getRecipeData(id)
        .then((data) => {
          setRecipe(data.recipe)
        })
        .catch((error) => alert(error))
    }
  }, [id])
    */

  return (
    <div className="recipe-root">
      <div className="recipe-header">
        <p className="recipe-heading">{recipe.label}</p>
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <p className="recipe-sub-heading">{recipe.cuisineType}</p>
        <p className="recipe-sub-heading">{recipe.dishType}</p>
        <p className="recipe-sub-heading">{recipe.mealType}</p>
        <p className="recipe-sub-heading">{recipe.dishType}</p>
      </div>
    </div>
  )
}

export default Recipe
