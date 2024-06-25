const Paginator = ({ currentPage, setCurrentPage, pages }) => {

    let pageButtons = [];
    for (let i = 1; i <= pages; i++) {
        const active = currentPage === i ? " link-light bg-primary" : " link-primary";
        pageButtons.push(<li className="page-item" key={i}><button className={"page-link" + active} onClick={() => { setCurrentPage(i); }}>{i}</button></li>);
    }

    let prevDisabled = "";
    let prevLink = " link-primary";
    let nextDisabled = "";
    let nextLink = " link-primary";
    if (currentPage === 1) {
        prevDisabled = " disabled";
        prevLink = " link-secondary";
    }
    if (currentPage === pages) {
        nextDisabled = " disabled";
        nextLink = " link-secondary";
    }

    return (
        <nav className="d-flex justify-content-center mt-5 w-100">
            <ul className="pagination pagination-lg">
                <li className={"page-item" + prevDisabled} ><button className={"page-link" + prevLink} onClick={() => { setCurrentPage(currentPage - 1); }}>Previous</button></li>
                {pageButtons}
                <li className={"page-item" + nextDisabled} ><button className={"page-link" + nextLink} onClick={() => { setCurrentPage(currentPage + 1); }}>Next</button></li>
            </ul>
        </nav>
    );
};
export default Paginator;