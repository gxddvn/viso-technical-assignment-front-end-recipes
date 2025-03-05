import { NavLink } from 'react-router-dom'
import { UnSaveIcon } from '../../icons'
import { DisplayInstructionInterface } from '../../../types'

const DisplayInstruction = ({savedRecipes, removeRecipe}: DisplayInstructionInterface) => {
    return (
        <div className="flex flex-col my-5">
            {savedRecipes.map((recipe) => (
                <div key={recipe.idMeal} className="flex flex-col bg-[rgba(255,255,255,.35)] p-5 rounded-md my-5">
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-semibold mb-2">{recipe.strMeal}</span>
                        <div className="flex items-center">
                            <NavLink to={`/recipe/${recipe.idMeal}`} className='mr-2 px-2 py-1 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>View</NavLink>
                            <button
                                onClick={() => removeRecipe(recipe.idMeal)}
                                className='px-2 py-1 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'
                            >
                                <UnSaveIcon className="w-5 h-6" />
                            </button>
                        </div>
                    </div>
                    <span className='text-lg font-semibold mb-2'>Category: <span className="font-medium">{recipe.strCategory}</span></span>
                    <span className="text-lg font-semibold pr-10">
                        Instructions: <span className="text-base font-medium">{recipe.strInstructions}</span>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default DisplayInstruction