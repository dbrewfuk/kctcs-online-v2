import React, { useEffect, useState } from "react";

const VerticalMediaMarquee = () => {
  const testimonials = [
    {
      title: "Video 1",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat convallis dui vel posuere.",
      name: "John Doe",
      type: "image", // Indicates this is an image testimonial
      photo: "./src/assets/admissions.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 2",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane Smith",
      type: "image", // Indicates this is an image testimonial
      photo: "./src/assets/as1.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 3",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane Smith",
      type: "video", // Indicates this is a video testimonial
      video:
        "https://www.dropbox.com/s/sd90kljtxqp68dg/background-video.mp4?raw=1", // Replace with actual video URL
    },
    {
      title: "Video 2",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane Smith",
      type: "image", // Indicates this is an image testimonial
      photo: "./src/assets/as1.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 2",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane Smith",
      type: "image", // Indicates this is an image testimonial
      photo: "./src/assets/as1.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 4",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane Smith",
      type: "video", // Indicates this is a video testimonial
      video: "https://demo.kctcs.edu/ko/media/drew.mp4", // Replace with actual video URL
    },
    // Add more testimonial objects as needed
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const marqueeContainerStyle = {
    overflow: "hidden",
    position: "absolute",
    top: "0",
    width: "100%",
    height: "200%", // Double the height to ensure seamless loop
    zIndex: "-1",
  };

  const marqueeStyle = {
    display: "flex",
    flexDirection: "column", // Change flex direction to column
    animation: "marquee-animation 50s linear infinite",
    width: "100%",
    height: "100%", // Fill the container height
  };

  const textStyle = {
    color: "#00467f",
    fontSize: "20px",
    fontWeight: "600",
  };

  return (
    <div className="py-[80px]">
      <div className="marquee-container" style={marqueeContainerStyle}>
        <div className="marquee" style={marqueeStyle}>
          {duplicatedTestimonials.map((testimonial, index) => {
            const containerWidth = window.innerWidth * 0.5; // 50vw
            const maxMargin = containerWidth * 0.5; // Maximum margin set to 20% of container width
            const leftMargin = Math.random() * maxMargin; // Random horizontal position between 0 and maxMargin
            const marginRight = Math.random() * maxMargin; // Random horizontal position between 0 and maxMargin
            const maxWidth = containerWidth - leftMargin - marginRight; // Calculate maximum width based on margins
            const maxTopMargin = window.innerHeight * 0.25; // 50%

            // Clamp the random top margin between 0 and 50%
            const topMargin = Math.random() * maxTopMargin;

            const itemStyle = {
              display: "flex",
              alignItems: "center",
              padding: "8px",
              height: `${Math.random() * 1000}%`,
              minHeight: "500px",
              maxHeight: "800px",
              marginLeft: `${leftMargin}px`, // Set left margin
              marginRight: `${marginRight}px`, // Set right margin
              marginTop: `${topMargin}px`, // Set top margin

              zIndex: index, // Ensure proper stacking order
            };

            let mediaContent;

            if (testimonial.type === "image") {
              mediaContent = (
                <div
                  className="aspect-square w-full relative"
                  style={textStyle}
                >
                  <img
                    src={testimonial.photo}
                    className="w-full h-full object-cover"
                    alt={testimonial.name}
                  />
                </div>
              );
            } else if (testimonial.type === "video") {
              mediaContent = (
                <div className="aspect-video w-full relative" style={textStyle}>
                  <video
                    src={testimonial.video}
                    className="w-full h-full object-cover"
                    autoPlay="autoplay"
                    muted="muted"
                    loop="loop"
                  />
                </div>
              );
            }

            return (
              <div key={index} className="marquee-item" style={itemStyle}>
                {mediaContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalMediaMarquee;
