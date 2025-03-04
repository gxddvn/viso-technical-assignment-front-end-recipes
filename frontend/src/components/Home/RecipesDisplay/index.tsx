import Loading from '../../Loading';
import { RecipeInterface, RecipesDisplayPropsInterface } from '../../../types';
import { NavLink } from 'react-router-dom';
import { SaveIcon, UnSaveIcon } from '../../icons';

const RecipesDisplay = ({isLoadingRecipes, displayedRecipes, savedRecipes, unsaveRecipeMutation, saveRecipeMutation}: RecipesDisplayPropsInterface) => {
    return (
        <div className='grid grid-cols-5 gap-4 justify-center w-full bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md p-2'>
            {isLoadingRecipes ? (<Loading />) : 
                displayedRecipes.map((meal: RecipeInterface) => {
                    const isSaved = savedRecipes.some((savedRecipe) => savedRecipe.idMeal === meal.idMeal);
                    return (
                        <div key={meal.idMeal} className='flex flex-col p-5 bg-[rgba(0,0,0,.3)] rounded-md shadow-md max-w-80 m-auto'>
                            <div className='w-full flex justify-center items-center'>
                                <img src={meal.strMealThumb} className='w-52 h-52 mb-5' alt={meal.strMeal} />
                            </div>
                            <span className='max-w-44'>Name: {meal.strMeal}</span>
                            <span className='mb-5'>Category: {meal.strCategory}</span>
                            <div className='flex items-center justify-between'>
                                <NavLink to={`/recipe/${meal.idMeal}`} className='px-3 py-2 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>View</NavLink>
                                <button
                                    onClick={() => isSaved ? unsaveRecipeMutation.mutate(meal) : saveRecipeMutation.mutate(meal)}
                                    className='px-3 py-2 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'
                                >
                                    {isSaved ? <UnSaveIcon className="w-5 h-6" /> : <SaveIcon className="w-5 h-6" />}
                                </button>
                            </div>
                        </div>
                    );
                })
            }                
        </div>
    )
}

export default RecipesDisplay