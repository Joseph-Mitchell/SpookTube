import { useEffect, useState } from "react";
import VideoGrid from "../../common/VideoGrid.jsx";
import Paginator from "../../common/Paginator.jsx";
import getAllVideos from "../../../services/getAllVideos.js";

const Homepage = () => {
    const VIDEOS_PER_PAGE = 18;
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState([]);

    async function refreshVideos() {
        const res = await getAllVideos(VIDEOS_PER_PAGE * (currentPage - 1), VIDEOS_PER_PAGE * currentPage);
        setVideos(res.videos);
        setPages(res.pages);
    }

    useEffect(() => {
        refreshVideos();
    }, [currentPage]);

    return (
        <>
            <VideoGrid videos={videos} background />
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </>
    );
};
export default Homepage;