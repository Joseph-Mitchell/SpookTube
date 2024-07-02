import { useEffect } from "react";
import { Modal } from 'bootstrap';

const DeleteModal = ({ message, setDeleteModal, confirmDelete, cancelDelete }) => {

    useEffect(() => {
        setDeleteModal(new Modal(document.getElementById("delete-modal")));
    }, []);

    return (
        <div id="delete-modal" className="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1>{message}</h1>
                    </div>
                    <div className="modal-footer d-flex justify-content-evenly">
                        <button id="delete-modal-cancel" type="button" className="btn btn-secondary w-25" onClick={cancelDelete}>Cancel</button>
                        <button id="delete-modal-confirm" type="button" className="btn btn-danger w-25" onClick={confirmDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeleteModal;