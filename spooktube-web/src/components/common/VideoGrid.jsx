import VideoCard from "./VideoCard.jsx";

const VideoGrid = ({ videos = [], user }) => {

    function clickDelete(videoId) {
        console.log(videoId);
    }

    let videoList = [];
    for (let i = 0; i < videos.length; i++) {
        let videoCard;

        if (user) {
            videoCard = (<VideoCard key={i} video={videos[i]} clickDelete={clickDelete} />);
        }
        else
            videoCard = (<VideoCard key={i} video={videos[i]} />);

        videoList.push(videoCard);
    }

    return (
        <div className="container-fluid d-flex justify-content-center w-100" id="">
            <div className={`row justify-content-around mt-5 px-5 pb-5 gy-5 bg-${user ? "transparent" : "secondary-subtle"}`} id="video-grid">
                {videoList}
            </div>
        </div>
    );
};
export default VideoGrid;