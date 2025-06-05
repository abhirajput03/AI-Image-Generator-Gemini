export const Pagination = ({ totalPages, handlePageChange, page }) => {
    return (
        <>
            <div className="flex items-center justify-center mt-2 border-t border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center gap-x-1">
                    <button
                        disabled={page == 1}
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50"
                        onClick={() => { handlePageChange(page - 1) }}
                    >
                        <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    {
                        Array.from({ length: totalPages }, (_, index) =>
                            <button
                                key={index + 1}
                                className={`min-h-9.5 min-w-9.5 flex justify-center items-center border text-gray-800 py-2 px-3 text-sm rounded-lg hover:border-[#6469ff] focus:outline-hidden disabled:opacity-50 ${page === index + 1 ? "border-[#6469ff]" : "border-transparent"} `}
                                onClick={() => { handlePageChange(index + 1) }}
                            >
                                {index + 1}
                            </button>
                        )
                    }
                    <button
                        disabled={page == totalPages}
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50"
                        onClick={() => { handlePageChange(page + 1) }}
                    >
                        <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
