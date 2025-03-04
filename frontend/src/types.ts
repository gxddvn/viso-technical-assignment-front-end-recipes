import { UseMutationResult } from "@tanstack/react-query";
import { UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";

export interface RecipeInterface { 
    idMeal: string; 
    strMeal: string; 
    strMealThumb: string; 
    strCategory: string 
}

export interface CategoryInterface {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface SavedRecipeInterface { 
    idMeal: string; 
    strMeal: string; 
    strMealThumb: string; 
    strCategory: string; 
    strInstructions: string; 
    [key: string]: any; 
}

export interface CustomDropDownMenuInterface {
    button: React.ReactNode
    children: React.ReactNode;
}

export interface UseSearchInterface {
    setSearchResults: React.Dispatch<React.SetStateAction<never[]>>; 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; 
    reset: UseFormReset<{search: string;}>;
}

export interface SearchInterface {
    search: string;
}

export interface UseChooseCategoryInterface {
    setSearchResults: React.Dispatch<React.SetStateAction<never[]>>; 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; 
    setCurrentCategory:React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage:  React.Dispatch<React.SetStateAction<number>>;
}

export interface UseClearFiltersInterface {
    setCurrentCategory:React.Dispatch<React.SetStateAction<string>>;
    setSearchResults: React.Dispatch<React.SetStateAction<never[]>>; 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; 
}

export interface UsePaginationInterface {
    recipes: RecipeInterface[]; 
    currentPage: number; 
    PAGE_SIZE: number;
}

export interface UseTotalPagesInterface{
    recipes: RecipeInterface[]; 
    PAGE_SIZE: number;
}

export interface CategoriesInterface {
    idCategory: string
    strCategory: string
    strCategoryDescription: string
    strCategoryThumb: string
}

export interface RecipesDisplayPropsInterface {
    isLoadingRecipes: boolean;
    displayedRecipes: RecipeInterface[];
    savedRecipes: RecipeInterface[];
    unsaveRecipeMutation: UseMutationResult<RecipeInterface, Error, RecipeInterface, unknown>; 
    saveRecipeMutation: UseMutationResult<RecipeInterface, Error, RecipeInterface, unknown>;
}

export interface FilterBarPropsInterface {
    handleSubmit: UseFormHandleSubmit<{search: string;}, undefined>; 
    onSubmit: (values: SearchInterface) => void;
    register: UseFormRegister<{search: string;}>;
    isValid: boolean;
    isLoadingCategories: boolean;
    categories: CategoryInterface[];
    chooseCategory: (category: string) => void;
}

export interface PaginationInterfdace {
    totalPages: number; 
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
}

export interface FilterTagBarInterface {
    currentCategory: string;
    searchQuery: string;
    clearFilters: () => void;
}