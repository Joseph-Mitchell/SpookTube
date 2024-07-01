import { useEffect, useState } from "react";
import VideoGrid from "../../common/VideoGrid.jsx";
import getAllVideos from "../../../services/getAllVideos.js";
import Paginator from "../../common/Paginator.jsx";
import CommentGrid from "./CommentGrid.jsx";
import getUserVideos from "../../../services/getUserVideos.js";

const MyContentPage = ({ loggedIn, loginFinished, navigate }) => {
    const SELECTED_CLASSES = "border-primary-subtle bg-primary-subtle text-primary z-2";
    const UNSELECTED_CLASSES = "border-body-secondary bg-body-secondary text-body-tertiary z-0";

    const [videoClasses, setVideoClasses] = useState(SELECTED_CLASSES);
    const [commentClasses, setCommentClasses] = useState(UNSELECTED_CLASSES);

    const VIDEOS_PER_PAGE = 18;
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!loggedIn && loginFinished) {
            navigate("/");
        }
    }, [loginFinished]);

    useEffect(() => {
        refreshVideos();
    }, [currentPage]);

    function clickVideos() {
        document.getElementById("user-video-grid").classList.remove("d-none");
        document.getElementById("user-comment-grid").classList.add("d-none");
        setVideoClasses(SELECTED_CLASSES);
        setCommentClasses(UNSELECTED_CLASSES);
    }

    function clickComments() {
        document.getElementById("user-video-grid").classList.add("d-none");
        document.getElementById("user-comment-grid").classList.remove("d-none");
        setVideoClasses(UNSELECTED_CLASSES);
        setCommentClasses(SELECTED_CLASSES);
    }

    async function refreshVideos() {
        const res = await getUserVideos(localStorage.getItem("token"), VIDEOS_PER_PAGE * (currentPage - 1), VIDEOS_PER_PAGE * currentPage);
        setVideos(res.videos);
        setPages(res.pages);
    }

    return (
        <>
            <div id="tabs" className="d-flex justify-content-evenly w-100">
                <button
                    className={`tab-button btn fs-2 border border-bottom-0 border-2 rounded-top-4 rounded-bottom-0 ${videoClasses}`}
                    onClick={clickVideos}
                >
                    Videos
                </button>
                <button
                    className={`tab-button btn fs-2 border border-bottom-0 border-2 rounded-top-4 rounded-bottom-0 ${commentClasses}`}
                    onClick={clickComments}
                >
                    Comments
                </button>
            </div>
            <div id="user-content" className="border border-start-0 border-end-0 border-top-2 border-primary-subtle bg-primary-subtle position-relative z-1">
                <div id="user-video-grid">
                    <VideoGrid videos={videos} user />
                </div>
                <div id="user-comment-grid" className="d-none">
                    <CommentGrid />
                </div>
                <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
            </div>
        </>
    );
};
export default MyContentPage;