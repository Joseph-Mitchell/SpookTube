import { useEffect, useState } from "react";

const UploadPage = ({ loggedIn, navigate }) => {

    const [video, setVideo] = useState({});
    const [dropZoneIcon, setDropZoneIcon] = useState("upload");
    const [dropZoneColour, setDropZoneColour] = useState("secondary");
    const [dropZoneText, setDropZoneText] = useState("Drag a video to upload");
    const [fileReader, setFileReader] = useState(new FileReader());

    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    });

    function badFile() {
        setDropZoneColour("danger");
        setDropZoneIcon("exclamation-lg");
        setDropZoneText("Please ensure the file is a Content Warning exported video");
    }

    function fileDropped(e) {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (!file || file.type !== "video/webm") {
            badFile();
            return;
        }

        setDropZoneColour("success");
        setDropZoneIcon("hourglass");
        setDropZoneText("Loading file...");

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

        document.getElementById("drop_zone").classList.add("d-none");
        e.target.classList.remove("d-none");
    }

    function fileHovering(e) {
        e.preventDefault();
        setDropZoneColour("primary");
        setDropZoneIcon("upload");
        setDropZoneText("Drop to upload...");
    }

    function fileNotHovering(e) {
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
                    className={`bg-${dropZoneColour} bg-opacity-25 border border-secondary border-opacity-50 rounded-4 d-flex flex-column justify-content-center align-items-center`}
                    id="drop_zone"
                    onDrop={fileDropped}
                    onDragOver={fileHovering}
                    onDragLeave={fileNotHovering}
                >
                    <i className={`bi-${dropZoneIcon} display-1 text-${dropZoneColour}`} />
                    <br />
                    <p className={`user-select-none fs-4 text-${dropZoneColour} text-center`} >{dropZoneText}</p>
                </div>
                <video id="upload-video" className="mx-auto w-100 d-none" controls />
            </form>
        </div>
    );
};
export default UploadPage;