import { useEffect, useState } from "react";
import { Modal } from 'bootstrap';
import IconButton from "./IconButton.jsx";

const IconModal = ({ setModal, chooseIcon }) => {
    const [buttonList, setButtonList] = useState([]);

    useEffect(() => {
        setModal(new Modal(document.getElementById("icon-modal")));

        let buttons = [];
        for (let i = 0; i < 9; i++) {
            buttons.push(<IconButton key={i} icon={i} chooseIcon={chooseIcon} />);
        }
        setButtonList(buttons);
    }, []);

    return (
        <div id="icon-modal" className="modal" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-center" >{"Choose Icon"}</h1>
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row row-cols-3 mx-2 gy-3">
                                {buttonList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default IconModal;