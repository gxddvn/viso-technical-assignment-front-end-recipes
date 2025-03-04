import CustomDropDownMenu from '../../CustomDropDownMenu'
import Loading from '../../Loading'
import { CategoriesInterface, FilterBarPropsInterface } from '../../../types'
import { MenuItem } from '@headlessui/react'
import { NavLink } from 'react-router-dom'

const FilterBar = ({ handleSubmit, onSubmit, register, isValid, isLoadingCategories, categories, chooseCategory }: FilterBarPropsInterface) => {
    return (
        <div className='flex items-center px-10 mb-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center mr-10'>
                <input required type="text" className='mr-5 border-2 p-2 text-black rounded-xl font-medium' {...register("search", { required: "Enter search!" })}/>
                <button type='submit' disabled={!isValid} className='px-2 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>Search</button>
            </form>
            <CustomDropDownMenu button={<button className='px-2 py-1 bg-[rgba(255,255,255,.35)] backdrop-blur-md rounded-md transition-all ease-linear hover:bg-[rgba(255,255,255,.2)]'>Categories</button>}>
                {isLoadingCategories ? (<Loading/>) :
                    categories?.map((category: CategoriesInterface) => (
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
    )
}

export default FilterBar