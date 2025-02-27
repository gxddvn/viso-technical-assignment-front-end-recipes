import axios from "axios";
import { useCallback } from "react";
import { UseChooseCategoryInterface, UseSearchInterface } from "../types";

export const useSearch = ({setSearchResults, setSearchQuery, reset}: UseSearchInterface) => {
    return useCallback(async (values: any) => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${values.search}`);
        setSearchResults(data.meals || []);
        setSearchQuery(values.search);
        reset();
    }, [reset]);
}

export const useChooseCategory = ({setCurrentCategory, setSearchResults, setSearchQuery, setCurrentPage}: UseChooseCategoryInterface) => {
    return useCallback((category: string) => {
        setCurrentCategory(category);
        setSearchResults([]);
        setSearchQuery('');
        setCurrentPage(1);
    }, []);
}