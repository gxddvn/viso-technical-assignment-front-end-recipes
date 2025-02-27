import CustomDropDownMenu from '../CustomDropDownMenu';
import { MenuItem } from '@headlessui/react';
import { SaveIcon, UnSaveIcon } from '../icons';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { RecipeInterface } from '../types';
import { useCategories, usePagination, useRecipes, useSaveRecipeMutation, useTotalPages, useUnSaveRecipeMutation } from '../hooks';
import { useChooseCategory, useSearch } from './index.hooks';
import Loading from '../Loading';

const PAGE_SIZE = 10;

const Home = () => {
    const queryClient = useQueryClient();
    const [currentCategory, setCurrentCategory] = useState('Chicken');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: recipes, isLoading: isLoadingRecipes } = useRecipes(currentCategory)
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState<RecipeInterface[]>(() => {
        const saved = localStorage.getItem('savedRecipes');
        return saved ? JSON.parse(saved) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }, [savedRecipes]);
    const saveRecipeMutation = useSaveRecipeMutation(queryClient, setSavedRecipes);
    const unsaveRecipeMutation = useUnSaveRecipeMutation(queryClient, setSavedRecipes)
    const paginatedRecipes = usePagination({recipes, currentPage, PAGE_SIZE})
    const totalPages = useTotalPages({recipes, PAGE_SIZE});

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

    const clearFilters = () => {
        setCurrentCategory('Chicken');
        setSearchResults([]);
        setSearchQuery('');
    };

    const displayedRecipes = searchResults.length > 0 ? searchResults : paginatedRecipes;

    return (
        <div className='flex flex-col flex-grow py-5 px-10'>
            <div className='flex items-center px-10 mb-5'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex items-center mr-10'>
                    <input required type="text" className='mr-5 border-2 p-2 text-black rounded-xl font-medium' {...register("search", { required: "Enter search!" })}/>
                    <button type='submit' disabled={!isValid} className='px-2 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>Search</button>
                </form>
                <CustomDropDownMenu button={<button className='px-2 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>Categories</button>}>
                    {isLoadingCategories ? (<Loading/>) :
                        categories.map((category: any) => (
                            <MenuItem key={category.idCategory}>
                                <button onClick={() => chooseCategory(category.strCategory)} className="block w-full text-left transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-sm">
                                    {category.strCategory}
                                </button>
                            </MenuItem>
                        ))
                    }
                </CustomDropDownMenu>
                <NavLink to="/recipe/choosen/" className=" mx-5 px-2 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]">Choosen Recipes</NavLink>
            </div>
            <div className='flex items-center mb-5'>
                {currentCategory && (
                    <span className='px-3 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md mr-2'>
                        Category: {currentCategory}
                    </span>
                )}
                {searchQuery && (
                    <span className='px-3 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md mr-2'>
                        Search: {searchQuery}
                    </span>
                )}
                {(currentCategory || searchQuery) && (
                    <button onClick={clearFilters} className='px-3 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>
                        Clear
                    </button>
                )}
            </div>
            <div className='grid grid-cols-5 gap-4 justify-center w-full bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md p-2'>
                {isLoadingRecipes ? (<Loading />) : 
                    displayedRecipes.map((meal: any) => {
                        const isSaved = savedRecipes.some((savedRecipe) => savedRecipe.idMeal === meal.idMeal);
                        return (
                            <div key={meal.idMeal} className='flex flex-col p-5 bg-[rgba(0,0,0,.3)] rounded-md shadow-md max-w-80 m-auto'>
                                <div className='w-full flex justify-center items-center'>
                                    <img src={meal.strMealThumb} className='w-52 h-52 mb-5' alt={meal.strMeal} />
                                </div>
                                <span className='max-w-44'>Name: {meal.strMeal}</span>
                                <span className='mb-5'>Category: {currentCategory}</span>
                                <div className='flex items-center justify-between'>
                                    <NavLink to={`/recipe/${meal.idMeal}`} className='px-3 py-2 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>View</NavLink>
                                    <button
                                        onClick={() => isSaved ? unsaveRecipeMutation.mutate(meal) : saveRecipeMutation.mutate(meal)}
                                        className='px-3 py-2 rounded-md bg-[rgba(255,255,255,.35)] transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'
                                    >
                                        {isSaved ? <UnSaveIcon className="w-5 h-6" /> : <SaveIcon className="w-5 h-6" />}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }                
            </div>
            <div className='flex items-center justify-center mt-5'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-2 mx-1 rounded-md transition-all ease-linear ${
                            currentPage === index + 1
                                ? 'bg-[rgba(255,255,255,.5)]'
                                : 'bg-[rgba(255,255,255,.35)] hover:bg-[rgba(255,255,255,.2)]'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;