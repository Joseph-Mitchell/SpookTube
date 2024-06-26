const CommentCard = ({ comment = { userId: { username: "", icon: "placeholder" } } }) => {

    if (comment.userId === null) {
        comment = { userId: { username: "", icon: "placeholder" } };
    }

    return (
        <div className="row bg-secondary-subtle mt-2 p-2">
            <div className="col-3 text-center py-0 ps-4 text-break">
                <img className="border border-4 border-dark rounded-5 mx-auto d-block" src={`icon-${comment.userId.icon}.png`} />
                {comment.userId.username}
            </div>
            <div className="col-9">
                {comment.comment}
            </div>
        </div>
    );
};
export default CommentCard;