import { useNavigate } from "react-router-dom";

const VideoCard = ({ video, clickDeleteVideo }) => {
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
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <div className="position-relative">
                <a className="btn btn-link" onClick={goToVideo} >
                    <img className="img rounded-4 border border-5 border-primary" src={source} />
                </a>
                <button id="video-delete-button" className={`btn btn-danger rounded rounded-2 position-absolute text-white${clickDeleteVideo ? "" : " d-none"}`} onClick={() => { clickDeleteVideo(video.videoId); }}><i className="bi-trash" /></button>
            </div>
        </div>
    );
};
export default VideoCard;