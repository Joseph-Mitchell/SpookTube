import { useState } from "react";
import VideoGrid from "../../common/VideoGrid.jsx";
import Paginator from "../../common/Paginator.jsx";

const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <VideoGrid />
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={5} />
        </>
    );
};
export default Homepage;