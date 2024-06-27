import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {

    const navigate = useNavigate();

    let source;
    if (video)
        source = `https://res.cloudinary.com/drtoipa5f/video/upload/w_250/${video.videoId}.jpg`;
    else
        source = `https://res.cloudinary.com/drtoipa5f/image/upload/sft5hacy89lpcj3wll8o.png`;

    function goToVideo() {
        navigate(`/watch?id=${video.videoId}`);
    }

    return (
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <a className="btn btn-link" onClick={goToVideo} ><img className="img rounded-4 border border-5 border-primary" src={source} /></a>
        </div>
    );
};
export default VideoCard;