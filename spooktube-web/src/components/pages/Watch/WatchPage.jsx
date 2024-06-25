import { useSearchParams } from "react-router-dom";

import VideoPlayer from "./VideoPlayer.jsx";
import CommentGrid from "../../common/CommentGrid.jsx";
import { useState } from "react";

const WatchPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [videoHeight, setVideoHeight] = useState(0);

    console.log(videoHeight);

    return (
        <div className="row row-cols-lg-2 video-player mx-auto pe-2 overflow-hidden">
            <VideoPlayer setVideoHeight={setVideoHeight} />
            <CommentGrid videoHeight={videoHeight} />
        </div>
    );
};
export default WatchPage;