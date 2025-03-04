import { FilterTagBarInterface } from "../../../types"

const FilterTagBar = ({currentCategory, searchQuery, clearFilters}: FilterTagBarInterface) => {
    return (
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
    )
}

export default FilterTagBar