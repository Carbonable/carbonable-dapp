import ReactPaginate from "react-paginate";

export default function PaginationComponent({ currentPage, pageCount, handlePageClick }: { pageCount?: number, handlePageClick: any , currentPage: number}) {
    if (!pageCount) return null;
    
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={null}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={null}
            containerClassName="flex items-center justify-center"
            pageClassName="flex items-center justify-center w-4 h-4 list-none mx-1 p-4 hover:bg-neutral-700 rounded-lg"
            activeClassName="bg-neutral-600 text-neutral-100 rounded-lg"
            previousClassName="hidden"
            nextClassName="hidden"
            breakClassName="list-none mx-1"
            forcePage={currentPage - 1}
        />
    )
}