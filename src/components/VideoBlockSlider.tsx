import React, { useEffect, useRef, useState } from 'react';

const VideoBlockSlider = ({ videoUrls, captions, delay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [videoUrls, delay]);

  const currentSrc = videoUrls[currentIndex];
  const currentCaption = captions[currentIndex];

  return (
    <div className="w-full h-full absolute">
      <iframe
        ref={videoRef}
        src={currentSrc}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title={currentCaption}
      ></iframe>
      <div className="absolute  bottom-0 left-0 text-xl text-white p-8 opacity-75 font-semibold">{currentCaption}</div>
    </div>
  );
};

export default VideoBlockSlider;
