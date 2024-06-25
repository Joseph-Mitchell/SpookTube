import { useEffect, useState } from "react";
import VideoGrid from "../../common/VideoGrid.jsx";
import Paginator from "../../common/Paginator.jsx";
import getAllVideos from "../../../services/getAllVideos.js";

const Homepage = () => {
    const VIDEOS_PER_PAGE = 18;
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState([]);

    async function refreshVideos() {
        const res = await getAllVideos(VIDEOS_PER_PAGE * (currentPage - 1), VIDEOS_PER_PAGE * currentPage);
        setVideos(res);
    }

    useEffect(() => {
        refreshVideos();
    }, [currentPage]);

    return (
        <>
            <VideoGrid videos={videos} />
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={5} />
        </>
    );
};
export default Homepage;