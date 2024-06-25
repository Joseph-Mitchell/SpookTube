const CommentCard = ({ comment }) => {
    return (
        <div className="row bg-secondary-subtle mt-2 p-2">
            <div className="col-2 text-center p-0">
                <img className="border border-4 border-dark rounded-5 mx-auto d-block" src="icon-placeholder.png" />
                EpicGamer
            </div>
            <div className="col-10">
                Epic comment moment I wrote an epic comment and I really think its very epic :)
            </div>
        </div>
    );
};
export default CommentCard;