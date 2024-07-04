const CommentForm = ({ newComment, setNewComment, sendComment }) => {
    return (
        <form className="d-flex mt-3" onSubmit={(e) => { e.preventDefault(); sendComment(); }}>
            <input
                className="form-control ms-1"
                type="text"
                value={newComment}
                onChange={(e) => { setNewComment(e.target.value); }}
            />
            <input
                className="btn btn-primary text-light ms-3 me-4"
                type="submit"
                value="Post"
                disabled={newComment === ""}
            />
        </form>
    );
};
export default CommentForm;