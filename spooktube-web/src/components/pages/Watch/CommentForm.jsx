const CommentForm = ({ newComment, setNewComment, sendComment }) => {
    return (
        <form className="d-flex mt-3">
            <input
                className="form-control ms-1"
                type="text"
                value={newComment}
                onChange={(e) => { setNewComment(e.target.value); }}
            />
            <input
                className="btn btn-primary text-light ms-3 me-4"
                type="button"
                value="Post"
                onClick={sendComment}
            />
        </form>
    );
};
export default CommentForm;