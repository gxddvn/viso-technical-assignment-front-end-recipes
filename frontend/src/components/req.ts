import axios from "axios";

export const fetchRecipes = async (category: string) => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    return data.meals;
};

export const fetchCategories = async () => {
    const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    return data.categories;
};

export const fetchRecipeById = async (id: string) => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return data.meals[0];
};