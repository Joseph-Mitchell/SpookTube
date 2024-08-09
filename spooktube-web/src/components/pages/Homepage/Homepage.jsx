import { useEffect, useState } from "react";
import VideoGrid from "../../common/VideoGrid.jsx";
import Paginator from "../../common/Paginator.jsx";
import getAllVideos from "../../../services/getAllVideos.js";

const Homepage = ({ setBackgroundHeight, videosPerPage, setVideosPerPage }) => {
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState([]);

    async function refreshVideos() {
        const res = await getAllVideos(videosPerPage * (currentPage - 1), videosPerPage * currentPage);
        setVideos(res.videos);
        setPages(res.pages);
    }

    useEffect(() => {
        refreshVideos();
    }, [currentPage]);

    return (
        <>
            <form className="w-100 d-flex justify-content-center mt-4" onSubmit={(e) => { e.preventDefault(); }}>
                <label className="me-3 pt-1" HTMLFor="videos-per-page">Videos Per Page</label>
                <input type="number" id="videos-per-page" value={videosPerPage} onChange={(e) => { setVideosPerPage(e.target.value); }} />
                <button type="button" className="btn btn-primary text-white ms-3" onClick={refreshVideos}>Set</button>
            </form>
            <VideoGrid videos={videos} setBackgroundHeight={setBackgroundHeight} />
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </>
    );
};
export default Homepage;