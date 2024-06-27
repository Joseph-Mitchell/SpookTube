import VideoPlayer from "./VideoPlayer.jsx";
import CommentGrid from "./CommentGrid.jsx";
import { useEffect, useState } from "react";
import getVideoComments from "../../../services/getVideoComments.js";

import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
    const [comments, setComments] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const [videoHeight, setVideoHeight] = useState(0);

    const [currentVideoTime, setCurrentVideoTime] = useState(0);

    async function loadComments() {
        let loadedData = await getVideoComments(searchParams.get("id"));
        setComments(loadedData.comments);
    }

    useEffect(() => {
        loadComments();
    }, []);

    return (
        <div className="row row-cols-lg-2 video-player mx-auto pe-2 overflow-hidden">
            <VideoPlayer videoId={searchParams.get("id")} setVideoHeight={setVideoHeight} setCurrentVideoTime={setCurrentVideoTime} />
            <CommentGrid comments={comments} videoHeight={videoHeight} currentVideoTime={currentVideoTime} />
        </div>
    );
};
export default WatchPage;