import { useEffect, useState, useRef } from "react";

import CommentCard from "./CommentCard.jsx";
import CommentForm from "./CommentForm.jsx";

import getVideoComments from "../../../services/getVideoComments.js";
import postComment from "../../../services/postComment.js";

const CommentGrid = ({ videoHeight, currentVideoTime, videoId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    async function loadComments() {
        let loadedData = await getVideoComments(videoId);
        await setComments(loadedData.comments);
    }

    async function sendComment() {
        let resComment = await postComment(newComment, videoId, Math.floor(currentVideoTime), localStorage.getItem("token"));
        comments.push(resComment.comment);

        comments.sort(sortCommentList);
        setComments(comments);

        populateCommentList();
    }

    function sortCommentList(a, b) {
        if (a.timeCode < b.timeCode) {
            return -1;
        }
        if (a.timeCode > b.timeCode) {
            return 1;
        }
        return 0;
    }

    async function populateCommentList() {
        let commentListTemp = [];
        for (let i = 0; i < comments.length; i++) {
            commentListTemp.push(<CommentCard key={i} comment={comments[i]} currentVideoTime={currentVideoTime} />);
        }
        await setCommentList(commentListTemp);
    }

    useEffect(() => {
        loadComments();
        populateCommentList();
    }, []);

    useEffect(() => {
        document.getElementById("comment-section").style.height = videoHeight + "px";
    }, [videoHeight]);

    useEffect(() => {
        populateCommentList();

        const commentListHolder = document.getElementById("comment-list");
        commentListHolder.scrollTo(0, commentListHolder.scrollHeight);
    }, [currentVideoTime]);

    return (
        <div id="comment-section" className="p-0">
            <div id="comment-list" className="overflow-y-scroll w-100">
                {commentList}
                {console.log("render", commentList)}
            </div>
            <CommentForm newComment={newComment} setNewComment={setNewComment} sendComment={sendComment} />
        </div>
    );
};
export default CommentGrid;