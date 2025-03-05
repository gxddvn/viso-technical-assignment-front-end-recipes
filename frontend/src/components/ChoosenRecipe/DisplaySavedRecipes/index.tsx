import { NavLink } from 'react-router-dom'
import { UnSaveIcon } from '../../icons'
import { DisplaySavedRecipesInterface } from '../../../types'

const DisplaySavedRecipes = ({savedRecipes, removeRecipe}: DisplaySavedRecipesInterface) => {
    return (
        <div className="flex-grow flex flex-col bg-[rgba(255,255,255,.35)] p-2">
            {savedRecipes.map((recipe) => (
                <div key={recipe.idMeal} className='flex flex-col p-5 bg-[rgba(0,0,0,.3)] rounded-md shadow-md max-w-80 my-2'>
                    <div className='w-full flex justify-center items-center'>
                        <img src={recipe.strMealThumb} className='w-32 h-32 mb-5' alt={recipe.strMeal} />
                    </div>
                    <span>Name: {recipe.strMeal}</span>
                    <span className='mb-5'>Category: {recipe.strCategory}</span>
                    <div className='flex items-center justify-between'>
                        <NavLink to={`/recipe/${recipe.idMeal}`} className='px-3 py-2 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>View</NavLink>
                        <button
                            onClick={() => removeRecipe(recipe.idMeal)}
                            className='px-3 py-2 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'
                        >
                            <UnSaveIcon className="w-5 h-6" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplaySavedRecipes