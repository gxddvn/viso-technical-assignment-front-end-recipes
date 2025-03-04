import { NavLink } from "react-router-dom";
import { HomeIcon, UnSaveIcon } from "../icons";
import { useEffect, useState } from "react";
import { SavedRecipeInterface } from "../../types";

const ChoosenRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState<SavedRecipeInterface[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('savedRecipes');
        if (saved) {
            setSavedRecipes(JSON.parse(saved));
        }
    }, []);

    const removeRecipe = (idMeal: string) => {
        setSavedRecipes((prevSavedRecipes) => {
            const updatedRecipes = prevSavedRecipes.filter((recipe) => recipe.idMeal !== idMeal);
            localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
            return updatedRecipes;
        });
    };

    const calculateIngredients = () => {
        const ingredientsMap = new Map();

        savedRecipes.forEach(recipe => {
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];

                if (ingredient) {
                    if (ingredientsMap.has(ingredient)) {
                        ingredientsMap.set(ingredient, `${ingredientsMap.get(ingredient)}, ${measure}`);
                    } else {
                        ingredientsMap.set(ingredient, measure);
                    }
                }
            }
        });

        return Array.from(ingredientsMap.entries());
    };

    const ingredients = calculateIngredients();

    return (
        <div className="flex flex-grow">
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
            <div className="flex-grow w-full p-10">
                <div className="flex mb-5">
                    <NavLink className="flex px-2 py-1 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]" to="/"><HomeIcon className="w-7 h-8"/></NavLink>
                </div>
                <h1 className="text-3xl font-bold">Choosen Recipes</h1>
                <h2 className="text-xl font-semibold my-2">All ingredients</h2>
                <table className="table-auto max-w-2xl w-80 mt-5 text-base">
                    <thead>
                        <tr>
                            <th className="pb-5">Ingredient</th>
                            <th className="pb-5">Measure</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map(([ingredient, measure]) => (
                            <tr key={ingredient}>
                                <td>{ingredient}</td>
                                <td>{measure}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            </div>
        </div>
    );
};

export default ChoosenRecipes;