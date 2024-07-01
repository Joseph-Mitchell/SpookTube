import VideoCard from "./VideoCard.jsx";

const VideoGrid = ({ videos = [], background }) => {

    let videoList = [];
    for (let i = 0; i < videos.length; i++) {
        videoList.push(<VideoCard key={i} video={videos[i]} />);
    }

    return (
        <div className="container-fluid d-flex justify-content-center w-100" id="">
            <div className={`row justify-content-around mt-5 px-5 pb-5 gy-5 bg-${background ? "secondary-subtle" : "transparent"}`} id="video-grid">
                {videoList}
            </div>
        </div>
    );
};
export default VideoGrid;