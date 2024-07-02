import { useEffect } from "react";
import { Modal } from 'bootstrap';

const DeleteModal = ({ setDeleteModal, confirmDeleteVideo, cancelDeleteVideo }) => {

    useEffect(() => {
        setDeleteModal(new Modal(document.getElementById("delete-modal")));
    }, []);

    return (
        <div id="delete-modal" className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1>Delete this video?</h1>
                    </div>
                    <div className="modal-footer d-flex justify-content-evenly">
                        <button id="delete-modal-cancel" type="button" className="btn btn-secondary w-25" onClick={cancelDeleteVideo}>Cancel</button>
                        <button id="delete-modal-confirm" type="button" className="btn btn-danger w-25" onClick={confirmDeleteVideo}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeleteModal;