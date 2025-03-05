import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeIcon } from "../icons";
import { useConvertIngredients, useRecipesId } from "../../hooks";
import IngredientTable from "../IngredientTable";
import RecipeTags from "./RecipeTags";

const Recipe = () => {
    const { id } = useParams();
    const { data: recipe, isLoading, error } = useRecipesId(id || '')

    const convertIngredients = useConvertIngredients({recipe})
    const ingredients = convertIngredients();
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading recipe</p>;
    if (!recipe) return <p>No recipe found</p>;

    return (
        <div className="flex flex-col flex-grow w-full p-5">
            <div className="flex">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-64 h-64 mr-12" />
                <div className="flex flex-col">
                    <div className="flex mb-5">
                        <NavLink className="flex px-2 py-1 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]" to="/"><HomeIcon className="w-7 h-8"/></NavLink>
                    </div>
                    <span className="text-lg font-semibold pr-10">
                        Instructions: {recipe.strInstructions}
                    </span>
                    <RecipeTags strTags={recipe.strTags || ''}/>
                </div>
            </div>
            <div className="flex flex-grow justify-between">
                <div className="flex flex-col mt-5">
                    <span className="text-2xl font-semibold mb-2">{recipe.strMeal}</span>
                    <span className="text-lg font-semibold">Category: {recipe.strCategory}</span>
                    <span className="text-base font-semibold">Area: {recipe.strArea}</span>
                    <span className="text-base font-semibold">YouTube: <a href={recipe.strYoutube} className="text-sideColor">{recipe.strYoutube ? recipe.strYoutube : "None"}</a></span>
                    <span className="text-base font-semibold">Source: <a href={recipe.strSource || '#'} className="text-sideColor">{recipe.strSource ? recipe.strSource : "None"}</a></span>
                    {recipe.dateModified && <span className="text-base font-semibold">Last Modified: {recipe.dateModified}</span>}
                </div>
                <div>
                    <IngredientTable ingredients={ingredients} />
                </div>
            </div>
        </div>
    );
};

export default Recipe;