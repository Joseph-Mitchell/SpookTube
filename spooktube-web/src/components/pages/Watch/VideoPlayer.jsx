import { useEffect, useRef } from 'react';

const VideoPlayer = ({ setVideoHeight, videoId, setCurrentVideoTime }) => {
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    window.onresize = resizeVideo;

    function resizeVideo(e) {
        const video = document.getElementById("video-container");
        setVideoHeight(video.offsetHeight);
    }

    function updateTime() {
        setCurrentVideoTime(document.getElementById("video-container").getElementsByTagName("video")[0].currentTime);
    }

    //Load video from cm
    useEffect(() => {
        const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_NAME;

        if (cloudinaryRef.current) return;
        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, { cloud_name: cloud_name });
    }, []);

    //
    useEffect(() => {
        const video = document.getElementById("video-container");
        setVideoHeight(video.offsetHeight * 1.8);
    }, []);

    return (
        <div id="video-container" className="d-flex justify-content-end h-100">
            <video
                ref={videoRef}
                data-cld-public-id={videoId}
                controls
                fluid="true"
                data-cld-colors='{ "base": "#000000", "accent": "#fd7e14", "text": "#fff" }'
                data-cld-hide-context-menu="true"
                data-cld-show-logo="false"
                onTimeUpdate={updateTime}
            />
        </div>
    );
};
export default VideoPlayer;