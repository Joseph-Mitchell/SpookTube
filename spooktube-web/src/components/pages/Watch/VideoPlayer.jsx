import { useEffect, useRef } from 'react';
import { useSearchParams } from "react-router-dom";

const VideoPlayer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_NAME;

        if (cloudinaryRef.current) return;
        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, { cloud_name: cloud_name });
    }, []);

    return (
        <div className="d-flex justify-content-end">
            <video
                ref={videoRef}
                data-cld-public-id={searchParams.get("id")}
                controls
                fluid="true"
                data-cld-colors='{ "base": "#000000", "accent": "#fd7e14", "text": "#fff" }'
                data-cld-hide-context-menu="true"
                data-cld-show-logo="false"
            />
        </div>
    );
};
export default VideoPlayer;