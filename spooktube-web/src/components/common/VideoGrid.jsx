import { useEffect, useState } from "react";
import VideoCard from "./VideoCard.jsx";

const VideoGrid = ({ videos = [], clickDeleteVideo, user, setBackgroundHeight }) => {
    const [videoCards, setVideoCards] = useState([]);

    useEffect(() => {
        let videoList = [];
        for (let i = 0; i < videos.length; i++) {
            let videoCard;

            if (user) {
                videoCard = (<VideoCard key={i} video={videos[i]} clickDeleteVideo={clickDeleteVideo} />);
            }
            else
                videoCard = (<VideoCard key={i} video={videos[i]} />);

            videoList.push(videoCard);
        }
        setVideoCards(videoList);
    }, [videos]);

    useEffect(() => {
        setBackgroundHeight();
    });

    return (
        <>
            <div className="container-fluid d-flex justify-content-center w-100">
                <div role="grid" className={`row justify-content-around mt-5 px-5 pb-5 gy-5 bg-${user ? "transparent" : "secondary-subtle"}`} id="video-grid">
                    {videoCards}
                </div>
            </div>
        </>
    );
};
export default VideoGrid;