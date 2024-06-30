import PropTypes from 'prop-types'

const Pagination = ({currentPage, totalPages, nextPage}) => {

    console.log("current page", currentPage)
    console.log("totalpages", totalPages)


    const pages = [...Array(totalPages).keys()].map(num => num + 1);


    return (
        <div className='flex gap-1'>
            <button className='rounded p-1 bg-slate-400 hover:bg-slate-500' disabled= {currentPage === 1} onClick={() => nextPage(currentPage - 1)}>Anterior</button>
            {
                pages.map(page => 
                    <button  className={`bg-slate-400 p-1 rounded ${page === currentPage ? 'bg-blue-500' : ''} `} key={page} disabled={page === currentPage} onClick={() => nextPage(page)}>{page}</button>
                )
            }

            <button  className='rounded p-1 bg-slate-400 hover:bg-slate-500'  disabled={currentPage >= totalPages } onClick={() => nextPage(currentPage + 1)}>Siguiente</button>

        </div>
    )
}


Pagination.propTypes = {
    currentPage : PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    nextPage : PropTypes.func.isRequired
}


export default Pagination
