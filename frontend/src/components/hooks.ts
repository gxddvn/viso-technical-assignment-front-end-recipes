import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchRecipeById, fetchRecipes } from "./req";
import { RecipeInterface, UsePaginationInterface, UseTotalPagesInterface } from "./types";
import { useMemo } from "react";

export const useRecipes = (currentCategory:string) => {
    return useQuery({
        queryKey: ['recipes', currentCategory],
        queryFn: () => fetchRecipes(currentCategory)
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });
}

export const saveRecipe = async (recipe: RecipeInterface) => {
    const fullRecipe = await fetchRecipeById(recipe.idMeal);
    return fullRecipe;
};

export const useSaveRecipeMutation = (queryClient: QueryClient, setSavedRecipes: React.Dispatch<React.SetStateAction<RecipeInterface[]>>) => {
    return useMutation<RecipeInterface, Error, RecipeInterface>({
        mutationFn: saveRecipe,
        onSuccess: (recipe: RecipeInterface) => {
            setSavedRecipes((prevSavedRecipes) => [...prevSavedRecipes, recipe]);
            queryClient.invalidateQueries({ queryKey: ['savedRecipes'] });
        },
    });
}

export const unsaveRecipe = async (recipe: RecipeInterface) => {
    return recipe;
};

export const useUnSaveRecipeMutation = (queryClient: QueryClient, setSavedRecipes: React.Dispatch<React.SetStateAction<RecipeInterface[]>>) => {
    return useMutation<RecipeInterface, Error, RecipeInterface>({
        mutationFn: unsaveRecipe,
        onSuccess: (recipe: RecipeInterface) => {
            setSavedRecipes((prevSavedRecipes) => prevSavedRecipes.filter((r) => r.idMeal !== recipe.idMeal));
            queryClient.invalidateQueries({ queryKey: ['savedRecipes'] });
        },
    });
}

export const usePagination = ({recipes, currentPage, PAGE_SIZE}: UsePaginationInterface) => {
    return useMemo(() => {
        if (!recipes) return [];
        const start = (currentPage - 1) * PAGE_SIZE;
        return recipes.slice(start, start + PAGE_SIZE);
    }, [recipes, currentPage]);
}

export const useTotalPages = ({recipes, PAGE_SIZE}: UseTotalPagesInterface) => {
    return useMemo(() => Math.ceil((recipes?.length || 0) / PAGE_SIZE), [recipes]);
}