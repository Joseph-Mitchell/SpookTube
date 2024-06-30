import { useEffect, useState } from "react";
import uploadVideo from "../../../services/uploadVideo.js";

const UploadPage = ({ loggedIn, navigate }) => {

    const [video, setVideo] = useState({});
    const [dropZoneIcon, setDropZoneIcon] = useState("upload");
    const [dropZoneColour, setDropZoneColour] = useState("secondary");
    const [dropZoneText, setDropZoneText] = useState("Drag a video to upload");
    const [fileReader, setFileReader] = useState(new FileReader());
    const [disableDrop, setDisableDrop] = useState(false);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    });

    function badUpload() {
        setDropZoneColour("danger");
        setDropZoneIcon("exclamation-lg");
        setDropZoneText("There was an internal error, please try again later");
        setDisableDrop(false);
    }

    async function sendUploadVideo() {
        document.getElementById("upload-video").classList.add("d-none");
        document.getElementById("upload-button").classList.add("d-none");
        document.getElementById("drop-zone").classList.remove("d-none");

        document.getElementById("drop-icon").classList.add("d-none");
        document.getElementById("drop-spinner").classList.remove("d-none");

        setDropZoneColour("success");
        setDropZoneText("Uploading file...");

        const response = await uploadVideo(video, localStorage.getItem("token"));

        if (response.message) {
            badUpload();
            return;
        }

        navigate("/watch?id=" + response.videoId);
    }

    function badFile() {
        setDropZoneColour("danger");
        setDropZoneIcon("exclamation-lg");
        setDropZoneText("Please ensure the file is a Content Warning exported video");
    }

    function fileDropped(e) {
        e.preventDefault();
        if (disableDrop) return;

        const file = e.dataTransfer.files[0];

        if (!file || file.type !== "video/webm") {
            badFile();
            return;
        }

        setDisableDrop(true);
        setDropZoneColour("success");
        document.getElementById("drop-icon").classList.add("d-none");
        document.getElementById("drop-spinner").classList.remove("d-none");
        setDropZoneText("Reading file...");

        fileReader.addEventListener("load", fileLoaded);
        fileReader.readAsDataURL(e.dataTransfer.files[0]);
    }

    function fileLoaded() {
        fileReader.removeEventListener("load", fileLoaded);

        const file = fileReader.result;

        const video = document.getElementById("upload-video");

        video.addEventListener("loadedmetadata", metaDataLoaded);
        video.setAttribute("src", file);

    }

    function metaDataLoaded(e) {
        e.target.removeEventListener("loadedmetadata", metaDataLoaded);

        if (e.target.videoWidth !== 420 || e.target.videoHeight !== 420) {
            console.log(e.target.videoWidth, e.target.videoHeight);
            badFile();
            return;
        }

        setVideo(e.target.getAttribute("src"));

        e.target.load();

        document.getElementById("drop-icon").classList.remove("d-none");
        document.getElementById("drop-spinner").classList.add("d-none");

        document.getElementById("drop-zone").classList.add("d-none");
        document.getElementById("upload-video").classList.remove("d-none");
        document.getElementById("upload-button").classList.remove("d-none");
    }

    function fileHovering(e) {
        if (disableDrop) return;
        e.preventDefault();
        setDropZoneColour("primary");
        setDropZoneIcon("upload");
        setDropZoneText("Drop to upload...");
    }

    function fileNotHovering(e) {
        if (disableDrop) return;
        e.preventDefault();
        setDropZoneColour("secondary");
        setDropZoneIcon("upload");
        setDropZoneText("Drag a video to upload");
    }

    return (
        <div className="w-100 mt-5 row">
            <form className="col-6 offset-3 d-flex flex-column justify-content-center" onSubmit={(e) => { e.preventDefault(); }}>
                <h1 className="text-center mb-4">Upload</h1>
                <div
                    className={`bg-${dropZoneColour} bg-opacity-25 border border-secondary border-opacity-50 rounded-4 d-flex flex-column justify-content-center align-items-center mx-auto`}
                    id="drop-zone"
                    onDrop={fileDropped}
                    onDragOver={fileHovering}
                    onDragLeave={fileNotHovering}
                >
                    <i id="drop-icon" className={`bi-${dropZoneIcon} display-1 text-${dropZoneColour}`} />
                    <div id="drop-spinner" className={`spinner-border spinner-border-lg text-${dropZoneColour} d-none`} />
                    <br />
                    <p className={`user-select-none fs-4 text-${dropZoneColour} text-center`} >{dropZoneText}</p>
                </div>
                <video id="upload-video" className="mx-auto w-100 d-none" controls />
                <button id="upload-button" className="btn btn-primary btn-lg text-light mt-4 w-25 mx-auto d-none" onClick={sendUploadVideo}>Upload</button>
            </form>
        </div>
    );
};
export default UploadPage;