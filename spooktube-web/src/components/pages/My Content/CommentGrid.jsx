import { useEffect, useState } from "react";

import CommentCard from "../Watch/CommentCard.jsx";
import getUserComments from "../../../services/getUserComments.js";

const CommentGrid = ({ currentPage, clickEditComment, role }) => {
    const COMMENTS_PER_PAGE = 18;

    const [comments, setComments] = useState([]);
    const [commentList, setCommentList] = useState([]);

    async function loadComments() {
        let loadedData = await getUserComments(localStorage.getItem("token"), COMMENTS_PER_PAGE * (currentPage - 1), COMMENTS_PER_PAGE * currentPage);
        await setComments(loadedData.comments);
    }

    async function populateCommentList() {
        let commentListTemp = [];
        for (let i = 0; i < comments.length; i++) {
            commentListTemp.push(<CommentCard key={i} comment={comments[i]} currentVideoTime="200" clickEditComment={clickEditComment} />);
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
        <>
            <div id="comment-section" className="row row-cols-2">
                <div className="col">
                    {commentList.slice(0, commentList.length / 2)}
                </div>
                <div className="col">
                    {commentList.slice(commentList.length / 2, commentList.length)}
                </div>
            </div>
        </>
    );
};
export default CommentGrid;