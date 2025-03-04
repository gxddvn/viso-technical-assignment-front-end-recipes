import { PaginationInterfdace } from '../../../types'

const Pagination = ({totalPages, setCurrentPage, currentPage}: PaginationInterfdace) => {
    return (
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
    )
}

export default Pagination