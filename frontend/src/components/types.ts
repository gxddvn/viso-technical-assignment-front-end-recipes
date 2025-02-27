import { UseFormReset } from "react-hook-form";

export interface RecipeInterface { 
    idMeal: string; 
    strMeal: string; 
    strMealThumb: string; 
    strCategory: string 
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

export interface UseChooseCategoryInterface {
    setSearchResults: React.Dispatch<React.SetStateAction<never[]>>; 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; 
    setCurrentCategory:React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage:  React.Dispatch<React.SetStateAction<number>>;
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