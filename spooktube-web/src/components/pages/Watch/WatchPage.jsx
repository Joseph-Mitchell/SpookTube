import VideoPlayer from "./VideoPlayer.jsx";
import CommentGrid from "./CommentGrid.jsx";
import { useState } from "react";

import { useSearchParams } from "react-router-dom";

const WatchPage = ({ loggedIn }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [videoHeight, setVideoHeight] = useState(0);
    const [currentVideoTime, setCurrentVideoTime] = useState(0);

    return (
        <div className="row row-cols-lg-2 video-player mx-auto pe-2 overflow-hidden">
            <VideoPlayer videoId={searchParams.get("id")} setVideoHeight={setVideoHeight} setCurrentVideoTime={setCurrentVideoTime} />
            <CommentGrid videoHeight={videoHeight} currentVideoTime={currentVideoTime} videoId={searchParams.get("id")} loggedIn={loggedIn} />
        </div>
    );
};
export default WatchPage;