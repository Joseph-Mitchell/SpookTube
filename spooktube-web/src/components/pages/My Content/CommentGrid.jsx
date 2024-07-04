import { useEffect, useState } from "react";

import CommentCard from "../Watch/CommentCard.jsx";
import getUserComments from "../../../services/getUserComments.js";
import getAllComments from "../../../services/getAllComments.js";

const CommentGrid = ({ currentPage, setPages, clickEditComment, role, loginFinished, currentTab, setBackgroundHeight, loadCommentsFlag, setLoadCommentsFlag }) => {
    const COMMENTS_PER_PAGE = 10;

    const [search, setSearch] = useState("");
    const [comments, setComments] = useState([]);
    const [commentList, setCommentList] = useState([]);

    async function loadComments() {
        let loadedData;
        if (role === "moderator")
            loadedData = await getAllComments(localStorage.getItem("token"), search, COMMENTS_PER_PAGE * (currentPage - 1), COMMENTS_PER_PAGE * currentPage);
        else
            loadedData = await getUserComments(localStorage.getItem("token"), COMMENTS_PER_PAGE * (currentPage - 1), COMMENTS_PER_PAGE * currentPage);

        await setComments(loadedData.comments);

        if (setPages && currentTab === "comments")
            await setPages(loadedData.pages);
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
    }, [search, loginFinished, currentTab, currentPage]);

    useEffect(() => {
        if (loadCommentsFlag) {
            loadComments();
            setLoadCommentsFlag(false);
        }
    }, [loadCommentsFlag]);

    useEffect(() => {
        populateCommentList();
    }, [comments]);

    useEffect(() => {
        setBackgroundHeight();
    });

    return (
        <>
            {
                role === "moderator" && (
                    <div className="w-100 d-flex justify-content-center mt-3">
                        Search: &nbsp;<input type="text" value={search} onChange={(e) => { setSearch(e.target.value); }} />
                    </div>
                )
            }
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