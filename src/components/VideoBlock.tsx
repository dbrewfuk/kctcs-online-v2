import { useState } from "react";
import stories from "../stories.json";

function VideoBlock() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandVideo = () => {
    setIsExpanded(true);
  };

  const videoUrl = stories[0].vimeo_id; // Assuming the video URL is located in the first item of the `stories` array

  return (
    <div className="video-block">
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        src="https://player.vimeo.com/video/853712282?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        title="West Ky Online Learning"
      ></iframe>
    </div>
  );
}

export default VideoBlock;
