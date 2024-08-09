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
            <VideoGrid videos={videos} setBackgroundHeight={setBackgroundHeight} />
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </>
    );
};
export default Homepage;