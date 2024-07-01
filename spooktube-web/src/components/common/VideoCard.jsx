import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video, clickDelete }) => {
    const navigate = useNavigate();
    let source;

    if (video)
        source = `https://res.cloudinary.com/drtoipa5f/video/upload/w_250/${video.videoId}.jpg`;
    else
        source = "thumb-placeholder.png";

    function goToVideo() {
        navigate(`/watch?id=${video.videoId}`);
    }

    return (
        <div className="col-12 col-md-6 col-lg-4 position-relative d-flex justify-content-center">
            <a className="btn btn-link" onClick={goToVideo} >
                <img className="img rounded-4 border border-5 border-primary" src={source} />
            </a>
            <button id="video-delete-button" className={`btn btn-danger rounded rounded-2 position-absolute text-white${clickDelete ? "" : " d-none"}`} onClick={() => { clickDelete(video.videoId); }}><i className="bi-trash" /></button>
        </div>
    );
};
export default VideoCard;