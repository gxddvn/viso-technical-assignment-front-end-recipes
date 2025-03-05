import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { RecipeInterface } from '../../types';
import { useCategories, useClearFilters, usePagination, useRecipes, useSaveRecipeMutation, useTotalPages, useUnSaveRecipeMutation } from '../../hooks';
import { useChooseCategory, useSearch } from '../../hooks';
import RecipesDisplay from './RecipesDisplay';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import FilterTagBar from './FilterTagBar';

const PAGE_SIZE = 10;

const Home = () => {
    const queryClient = useQueryClient();
    const [currentCategory, setCurrentCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: recipes, isLoading: isLoadingRecipes } = useRecipes()
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState<RecipeInterface[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<RecipeInterface[]>(() => {
        const saved = localStorage.getItem('savedRecipes');
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }, [savedRecipes]);
    const saveRecipeMutation = useSaveRecipeMutation(queryClient, setSavedRecipes);
    const unsaveRecipeMutation = useUnSaveRecipeMutation(queryClient, setSavedRecipes)
    const paginatedRecipes = usePagination({recipes: recipes || [], currentPage, PAGE_SIZE})
    const totalPages = useTotalPages({recipes: recipes || [], PAGE_SIZE});

    const {
        register, 
        handleSubmit, 
        formState: { isValid },
        reset
    } = useForm({ 
        defaultValues: {
            search: "",
        }, 
        mode: "onBlur",
    });
    const onSubmit = useSearch({setSearchResults, setSearchQuery, reset})
    const chooseCategory = useChooseCategory({setCurrentCategory, setSearchResults, setSearchQuery, setCurrentPage})
    const clearFilters = useClearFilters({setCurrentCategory, setSearchResults, setSearchQuery})

    const displayedRecipes = searchResults.length > 0 ? searchResults : paginatedRecipes;
    console.log("renderApp")
    return (
        <div className='flex flex-col flex-grow py-5 px-10'>
            <FilterBar 
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                isValid={isValid}
                isLoadingCategories={isLoadingCategories}
                categories={categories || []}
                chooseCategory={chooseCategory}
            />
            <FilterTagBar 
                currentCategory={currentCategory}
                searchQuery={searchQuery}
                clearFilters={clearFilters}
            />
            <RecipesDisplay
                isLoadingRecipes={isLoadingRecipes}
                displayedRecipes={displayedRecipes}
                savedRecipes={savedRecipes}
                saveRecipeMutation={saveRecipeMutation}
                unsaveRecipeMutation={unsaveRecipeMutation}
            />
            <Pagination 
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default Home;