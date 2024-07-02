import { useEffect, useState } from "react";
import { Modal } from 'bootstrap';

const EditCommentModal = ({ setEditModal, confirmEdit, cancelEdit, newComment, setNewComment }) => {
    useEffect(() => {
        setEditModal(new Modal(document.getElementById("edit-comment-modal")));
    }, []);

    return (
        <div id="edit-comment-modal" className="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-center" >{"Edit Comment"}</h1>
                        <form className="w-100" onSubmit={(e) => { e.preventDefault(); }}>
                            <textarea id="edit-comment-text" className="w-100 mb-2" value={newComment} onChange={(e) => { setNewComment(e.target.value); }} />
                            <br />
                            <div className="d-flex justify-content-evenly">
                                <button id="edit-comment-modal-confirm" type="button" className="btn btn-primary w-25" onClick={confirmEdit}>Confirm</button>
                                <button id="edit-comment-modal-cancel" type="button" className="btn btn-secondary w-25" onClick={cancelEdit}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};
export default EditCommentModal;