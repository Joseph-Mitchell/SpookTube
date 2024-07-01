import { useEffect, useState } from "react";

import CommentCard from "../Watch/CommentCard.jsx";
import getVideoComments from "../../../services/getVideoComments.js";

const CommentGrid = () => {
    const [comments, setComments] = useState([]);
    const [commentList, setCommentList] = useState([]);

    async function loadComments() {
        let loadedData = await getVideoComments("content_warning_112c4908_jfq7xa");
        await setComments(loadedData.comments);
    }

    async function populateCommentList() {
        let commentListTemp = [];
        for (let i = 0; i < comments.length; i++) {
            commentListTemp.push(<CommentCard key={i} comment={comments[i]} currentVideoTime="200" />);
        }
        await setCommentList(commentListTemp);
    }

    useEffect(() => {
        loadComments();
    }, []);

    useEffect(() => {
        populateCommentList();
    }, [comments]);

    return (
        <div id="comment-section" className="row row-cols-2">
            <div className="col">
                {commentList.slice(0, commentList.length / 2)}
            </div>
            <div className="col">
                {commentList.slice(commentList.length / 2, commentList.length)}
            </div>
        </div>
    );
};
export default CommentGrid;