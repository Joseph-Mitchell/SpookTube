import { useEffect } from "react";
import CommentCard from "./CommentCard.jsx";

const CommentGrid = ({ comments = [], videoHeight }) => {

    let commentList = [];
    for (let i = 0; i < 20; i++) {
        commentList.push(<CommentCard key={i} comment={comments[i]} />);
    }

    useEffect(() => {
        document.getElementById("comment-list").style.height = videoHeight + "px";
    }, [videoHeight]);

    return (
        <div id="comment-list" className="p-0">
            <div className="overflow-y-scroll h-100 w-100">
                {commentList}
            </div>
        </div>
    );
};
export default CommentGrid;