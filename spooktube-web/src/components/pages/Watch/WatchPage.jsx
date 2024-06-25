import { useSearchParams } from "react-router-dom";

import VideoPlayer from "./VideoPlayer.jsx";

const WatchPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let player;

    return (
        <div className="row row-cols-lg-2 video-player mx-auto">
            <VideoPlayer />
            <div></div>
        </div>
    );
};
export default WatchPage;