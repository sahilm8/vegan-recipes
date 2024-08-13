import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Results from "./pages/results/Results"
import Recipe from "./pages/recipe/Recipe"
import NotFound from "./pages/notFound/NotFound"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:query" element={<Results />} />
        <Route path="/recipe/:uri" element={<Recipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
