import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchRecipeById, fetchRecipes, fetchRecipesByCategory, fetchSearch } from "./api";
import { RecipeInterface, SearchInterface, UseChooseCategoryInterface, UseClearFiltersInterface, UsePaginationInterface, UseSearchInterface, UseTotalPagesInterface } from "./types";

export const useRecipes = () => {
    return useQuery({
        queryKey: ['recipes'],
        queryFn: () => fetchRecipes()
    });
};

export const useRecipesByCategory = (currentCategory:string) => {
    return useQuery({
        queryKey: ['recipes', currentCategory],
        queryFn: () => fetchRecipesByCategory(currentCategory)
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

export const useSearch = ({ setSearchResults, setSearchQuery, reset }: UseSearchInterface) => {
    const [searchValues, setSearchValues] = useState<SearchInterface | null>(null);

    const { data, refetch, isSuccess } = useQuery({
        queryKey: ["search", searchValues],
        queryFn: () => fetchSearch(searchValues!),
        enabled: !!searchValues,
    });

    const search = useCallback((values: SearchInterface) => {
        setSearchQuery(values.search);
        setSearchValues(values);
        refetch();
    }, [setSearchQuery, refetch]);

    useEffect(() => {
        if (isSuccess) {
            setSearchResults(data || []);
            reset();
        }
    }, [isSuccess, data, reset, setSearchResults]);

    return search;
};

export const useChooseCategory = ({setCurrentCategory, setSearchResults, setSearchQuery, setCurrentPage}: UseChooseCategoryInterface) => {
    const [categoryValues, setCategoryValues] = useState<string | null>('');

    const { data, refetch, isSuccess } = useQuery({
        queryKey: ["recipes", categoryValues],
        queryFn: () => fetchRecipesByCategory(categoryValues!),
        enabled: !!categoryValues,
    });
    
    const category = useCallback((category: string) => {
        setCurrentCategory(category);
        setSearchResults([]);
        setSearchQuery('');
        setCurrentPage(1);
        setCategoryValues(category)
        refetch()
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setSearchResults(data || []);
        }
    }, [isSuccess, data, setSearchResults]);

    return category;
}

export const useClearFilters = ({setCurrentCategory, setSearchResults, setSearchQuery}: UseClearFiltersInterface) => {
    return useCallback(() => {
        setCurrentCategory('Chicken');
        setSearchResults([]);
        setSearchQuery('');
    }, []);
}