import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeIcon } from "../icons";
import { fetchRecipeById } from "../../api";

const Recipe = () => {
    const { id } = useParams();
    const { data: recipe, isLoading, error } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => fetchRecipeById(id!),
        enabled: !!id
    });

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
                    <span className="flex items-center text-lg font-medium">Tags:
                        <div className="flex items-center p-2">
                            {recipe.strTags && recipe.strTags.split(',').map((tag: string) => (
                                <span key={tag} className="bg-[rgba(255,255,255,.35)] text-base rounded-md p-2 mx-2 my-1">{tag}</span>
                            ))}
                        </div>
                    </span>
                </div>
            </div>
            <div className="flex flex-grow justify-between">
                <div className="flex flex-col mt-5">
                    <span className="text-2xl font-semibold mb-2">{recipe.strMeal}</span>
                    <span className="text-lg font-semibold">Category: {recipe.strCategory}</span>
                    <span className="text-base font-semibold">Area: {recipe.strArea}</span>
                    <span className="text-base font-semibold">YouTube: <a href={recipe.strYoutube} className="text-sideColor">{recipe.strYoutube ? recipe.strYoutube : "None"}</a></span>
                    <span className="text-base font-semibold">Source: <a href={recipe.strSource} className="text-sideColor">{recipe.strSource}</a></span>
                    {recipe.dateModified && <span className="text-base font-semibold">Last Modified: {recipe.dateModified}</span>}
                </div>
                <div>
                    <table className="table-auto max-w-2xl w-80 mt-5 text-base">
                        <thead>
                            <tr>
                                <th className="pb-5">Ingredient</th>
                                <th className="pb-5">Measure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                                const ingredient = recipe[`strIngredient${i}`];
                                const measure = recipe[`strMeasure${i}`];
                                return ingredient ? (
                                    <tr key={i}>
                                        <td>{ingredient}</td>
                                        <td>{measure}</td>
                                    </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Recipe;