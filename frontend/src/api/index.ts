import axios from "axios";
import { CategoryInterface, RecipeInterface, SearchInterface } from "../types";

export const fetchRecipes = async () => {
    const { data } = await axios.get<{ meals: RecipeInterface[] }>('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return data.meals;
}

export const fetchRecipesByCategory = async (category: string) => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    return data.meals;
};

export const fetchCategories = async () => {
    const { data } = await axios.get<{categories: CategoryInterface[]}>('https://www.themealdb.com/api/json/v1/1/categories.php');
    return data.categories;
};

export const fetchRecipeById = async (id: string) => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return data.meals[0];
};

export const fetchSearch = async (values: SearchInterface) => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${values.search}`);
    return data.meals
}