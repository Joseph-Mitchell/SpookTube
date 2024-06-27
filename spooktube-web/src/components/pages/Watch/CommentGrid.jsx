import { useEffect } from "react";
import CommentCard from "./CommentCard.jsx";
import CommentForm from "./CommentForm.jsx";

const CommentGrid = ({ comments = [], videoHeight }) => {

    let commentList = [];
    for (let i = 0; i < comments.length; i++) {
        commentList.push(<CommentCard key={i} comment={comments[i]} />);
    }

    useEffect(() => {
        document.getElementById("comment-section").style.height = videoHeight + "px";
    }, [videoHeight]);

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