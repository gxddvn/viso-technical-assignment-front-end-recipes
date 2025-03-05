import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { useEffect, useState } from "react";
import { SavedRecipeInterface } from "../../types";
import IngredientTable from "../IngredientTable";
import { useCalculateIngredients, useRemoveRecipes } from "../../hooks";
import DisplaySavedRecipes from "./DisplaySavedRecipes";
import DisplayInstruction from "./DisplayInstructions";

const ChoosenRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState<SavedRecipeInterface[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('savedRecipes');
        if (saved) {
            setSavedRecipes(JSON.parse(saved));
        }
    }, []);

    const removeRecipe = useRemoveRecipes({setSavedRecipes})

    const calculateIngredients = useCalculateIngredients({savedRecipes})
    const ingredients = calculateIngredients();

    return (
        <div className="flex flex-grow">
            <DisplaySavedRecipes savedRecipes={savedRecipes} removeRecipe={removeRecipe} />
            <div className="flex-grow w-full p-10">
                <div className="flex mb-5">
                    <NavLink className="flex px-2 py-1 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]" to="/"><HomeIcon className="w-7 h-8"/></NavLink>
                </div>
                <h1 className="text-3xl font-bold">Choosen Recipes</h1>
                <h2 className="text-xl font-semibold my-2">All ingredients</h2>
                <IngredientTable ingredients={ingredients} />
                <DisplayInstruction savedRecipes={savedRecipes} removeRecipe={removeRecipe}/>
            </div>
        </div>
    );
};

export default ChoosenRecipes;