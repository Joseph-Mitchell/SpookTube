import { useEffect } from "react";
import CommentCard from "./CommentCard.jsx";
import CommentForm from "./CommentForm.jsx";

const CommentGrid = ({ comments = [], videoHeight, currentVideoTime }) => {

    let commentList = [];
    for (let i = 0; i < comments.length; i++) {
        commentList.push(<CommentCard key={i} comment={comments[i]} currentVideoTime={currentVideoTime} />);
    }

    useEffect(() => {
        document.getElementById("comment-section").style.height = videoHeight + "px";
    }, [videoHeight]);

    useEffect(() => {
        const commentList = document.getElementById("comment-list");
        commentList.scrollTo(0, commentList.scrollHeight);
    }, [currentVideoTime]);

    return (
        <div id="comment-section" className="p-0">
            <div id="comment-list" className="overflow-y-scroll w-100">
                {commentList}
            </div>
            <CommentForm />
        </div>
    );
};
export default CommentGrid;