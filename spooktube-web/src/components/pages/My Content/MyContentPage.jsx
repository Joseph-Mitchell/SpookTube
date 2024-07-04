import { useEffect, useState } from "react";
import VideoGrid from "../../common/VideoGrid.jsx";
import Paginator from "../../common/Paginator.jsx";
import CommentGrid from "./CommentGrid.jsx";
import getUserVideos from "../../../services/getUserVideos.js";
import DeleteModal from "../../ui/DeleteModal.jsx";
import deleteVideo from "../../../services/deleteVideo.js";
import EditCommentModal from "../../ui/EditModal.jsx";
import editComment from "../../../services/editComment.js";
import deleteComment from "../../../services/deleteComment.js";
import getAllVideos from "../../../services/getAllVideos.js";

const MyContentPage = ({ loggedIn, loginFinished, navigate, role, setBackgroundHeight }) => {
    const SELECTED_CLASSES = "border-primary-subtle bg-primary-subtle text-primary z-2";
    const UNSELECTED_CLASSES = "border-body-secondary bg-body-secondary text-body-tertiary z-0";

    const [videoClasses, setVideoClasses] = useState(SELECTED_CLASSES);
    const [commentClasses, setCommentClasses] = useState(UNSELECTED_CLASSES);

    const VIDEOS_PER_PAGE = 18;
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState([]);

    const [deleteVideoModal, setDeleteVideoModal] = useState({});
    const [deleteCommentModal, setDeleteCommentModal] = useState({});
    const [toBeDeleted, setToBeDeleted] = useState("");

    const [newComment, setNewComment] = useState("");
    const [commentEditing, setCommentEditing] = useState("");
    const [editModal, setEditModal] = useState({});
    const [loadCommentsFlag, setLoadCommentsFlag] = useState(false);

    const [currentTab, setCurrentTab] = useState("videos");

    useEffect(() => {
        if (!loggedIn && loginFinished) {
            navigate("/");
        }
    }, [loginFinished]);

    useEffect(() => {
        refreshVideos();
    }, [currentPage, loginFinished, currentTab]);

    function clickVideos() {
        document.getElementById("user-video-grid").classList.remove("d-none");
        document.getElementById("user-comment-grid").classList.add("d-none");
        setVideoClasses(SELECTED_CLASSES);
        setCommentClasses(UNSELECTED_CLASSES);
        setCurrentTab("videos");
    }

    function clickComments() {
        document.getElementById("user-video-grid").classList.add("d-none");
        document.getElementById("user-comment-grid").classList.remove("d-none");
        setVideoClasses(UNSELECTED_CLASSES);
        setCommentClasses(SELECTED_CLASSES);
        setCurrentTab("comments");
    }

    async function refreshVideos() {
        let response;
        if (role === "moderator")
            response = await getAllVideos(VIDEOS_PER_PAGE * (currentPage - 1), VIDEOS_PER_PAGE * currentPage);
        else
            response = await getUserVideos(localStorage.getItem("token"), VIDEOS_PER_PAGE * (currentPage - 1), VIDEOS_PER_PAGE * currentPage);

        setVideos(response.videos);
        if (currentTab === "videos")
            setPages(response.pages);
    }

    function clickEditComment(id, comment) {
        setNewComment(comment);
        setCommentEditing(id);
        editModal.show();
    }

    async function confirmEditComment() {
        document.getElementById("edit-comment-modal-confirm").setAttribute("disabled", true);
        document.getElementById("edit-comment-modal-cancel").setAttribute("disabled", true);

        await editComment(commentEditing, newComment, localStorage.getItem("token"));
        cancelEditComment();
        document.getElementById("edit-comment-modal-confirm").removeAttribute("disabled");
        document.getElementById("edit-comment-modal-cancel").removeAttribute("disabled");
        setLoadCommentsFlag(true);
    }

    function cancelEditComment() {
        setNewComment("");
        setCommentEditing("");
        editModal.hide();
    }

    function clickDeleteVideo(videoId) {
        setToBeDeleted(videoId);
        deleteVideoModal.show();
    }

    async function confirmDeleteVideo() {
        document.getElementById("delete-modal-video-cancel").setAttribute("disabled", true);
        document.getElementById("delete-modal-video-confirm").setAttribute("disabled", true);
        await deleteVideo(toBeDeleted, localStorage.getItem("token"));
        cancelDeleteVideo();
        document.getElementById("delete-modal-video-cancel").removeAttribute("disabled");
        document.getElementById("delete-modal-video-confirm").removeAttribute("disabled");
        refreshVideos();
    }

    function cancelDeleteVideo() {
        setToBeDeleted("");
        deleteVideoModal.hide();
    }

    function clickDeleteComment() {
        editModal.hide();
        deleteCommentModal.show();
    }

    async function confirmDeleteComment() {
        document.getElementById("delete-modal-comment-cancel").setAttribute("disabled", true);
        document.getElementById("delete-modal-comment-confirm").setAttribute("disabled", true);
        console.log(await deleteComment(commentEditing, localStorage.getItem("token")));
        setCommentEditing("");
        setLoadCommentsFlag(true);
        deleteCommentModal.hide();
        document.getElementById("delete-modal-comment-cancel").removeAttribute("disabled");
        document.getElementById("delete-modal-comment-confirm").removeAttribute("disabled");
    }

    function cancelDeleteComment() {
        deleteCommentModal.hide();
        editModal.show();
    }

    return (
        <>
            <DeleteModal id="video" setDeleteModal={setDeleteVideoModal} confirmDelete={confirmDeleteVideo} cancelDelete={cancelDeleteVideo} />
            <DeleteModal id="comment" setDeleteModal={setDeleteCommentModal} confirmDelete={confirmDeleteComment} cancelDelete={cancelDeleteComment} />
            <EditCommentModal
                setEditModal={setEditModal}
                confirmEdit={confirmEditComment}
                cancelEdit={cancelEditComment}
                newComment={newComment}
                setNewComment={setNewComment}
                clickDeleteComment={clickDeleteComment}
            />
            <div id="tabs" className="d-flex justify-content-evenly w-100">
                <button
                    role="switch"
                    className={`tab-button btn fs-2 border border-bottom-0 border-2 rounded-top-4 rounded-bottom-0 ${videoClasses}`}
                    onClick={clickVideos}
                >
                    Videos
                </button>
                <button
                    role="switch"
                    className={`tab-button btn fs-2 border border-bottom-0 border-2 rounded-top-4 rounded-bottom-0 ${commentClasses}`}
                    onClick={clickComments}
                >
                    Comments
                </button>
            </div>
            <div id="user-content" className="border border-start-0 border-end-0 border-top-2 border-primary-subtle bg-primary-subtle position-relative z-1">
                <div role="grid" id="user-video-grid">
                    <VideoGrid videos={videos} clickDeleteVideo={clickDeleteVideo} user setBackgroundHeight={setBackgroundHeight} />
                </div>
                <div role="grid" id="user-comment-grid" className="d-none">
                    <CommentGrid currentPage={currentPage} setPages={setPages} clickEditComment={clickEditComment} role={role} loginFinished={loginFinished} currentTab={currentTab} setBackgroundHeight={setBackgroundHeight} loadCommentsFlag={loadCommentsFlag} setLoadCommentsFlag={setLoadCommentsFlag} />
                </div>
                <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
            </div>
        </>
    );
};
export default MyContentPage;