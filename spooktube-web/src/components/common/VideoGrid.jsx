import { useEffect } from "react";
import VideoCard from "./VideoCard.jsx";

const VideoGrid = () => {

    let videoList = [];
    const items = 18;
    for (let i = 0; i < items; i++) {
        videoList.push(<VideoCard key={i} />);
    }

    return (
        <div className="container-fluid d-flex justify-content-center w-100" id="">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 p-5 gy-5 bg-secondary-subtle" id="video-grid">
                {videoList}
            </div>
        </div>
    );
};
export default VideoGrid;