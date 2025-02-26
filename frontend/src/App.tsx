import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Recipe from './components/Recipe'
import ChoosenRecipes from './components/ChoosenRecipe'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/recipe/:id' element={<Recipe />}/>
      <Route path='/recipe/choosen/' element={<ChoosenRecipes />}/>
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  )
}

export default App
