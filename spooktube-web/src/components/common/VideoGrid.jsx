import { useEffect } from "react";
import VideoCard from "./VideoCard.jsx";

const VideoGrid = () => {

    let videoList = [];
    const items = 18;
    for (let i = 0; i < items; i++) {
        videoList.push(<VideoCard key={i} />);
    }

    return (
        <div className="container-fluid">
            <div className="row row-cols-3 mt-5 mx-5 px-5 gy-5 bg-secondary-subtle">
                {videoList}
            </div>
        </div>
    );
};
export default VideoGrid;