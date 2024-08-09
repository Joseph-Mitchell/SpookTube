const CommentCard = ({ comment = { _id: "1", userId: { username: "", icon: "placeholder" }, timeCode: 0 }, currentVideoTime, clickEditComment }) => {

    if (comment.userId === null) {
        comment = { userId: { username: "", icon: "placeholder" }, timeCode: 0 };
    }

    let display;
    if (currentVideoTime > comment.timeCode)
        display = "d-flex";
    else
        display = "d-none";

    return (
        <div role="comment" className={`row bg-secondary-subtle mt-2 me-2 ms-1 p-2 ${display} position-relative`}>
            <div className="col-3 text-center py-0 ps-4 text-break">
                <p className="user-icon border border-4 border-dark rounded-circle mb-0 py-2 text-black text-center user-select-none overflow-hidden" style={{ backgroundColor: comment.userId.iconColour }}>
                    {comment.userId.iconText}
                </p>
                {comment.userId.username}
            </div>
            <div className="col-9 text-break">
                {comment.comment}
            </div>
            <button id="comment-edit-button" className={`btn btn-light rounded rounded-2 position-absolute ${clickEditComment ? "" : " d-none"}`} onClick={() => { clickEditComment(comment._id, comment.comment); }}><i className="bi-pencil-square" /></button>
        </div>
    );
};
export default CommentCard;