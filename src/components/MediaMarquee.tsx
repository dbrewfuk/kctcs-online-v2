import React from "react";

const MediaMarquee = () => {
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

  // Duplicate the testimonials to ensure the marquee restarts seamlessly
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const marqueeContainerStyle = {
    overflow: "hidden",
    position: "absolute",
    top: "0",
    height: "60vh",
    width: "200%",
    zIndex: "-1",
  };

  const marqueeStyle = {
    display: "flex",
    animation: "marquee-animation 50s linear infinite",
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
        <div className="marquee flex gap-[80px]" style={marqueeStyle}>
          {duplicatedTestimonials.map((testimonial, index) => {
            const containerHeight = window.innerHeight * 0.5; // 50vh
            const maxMargin = containerHeight * 0.5; // Maximum margin set to 20% of container height
            const topMargin = Math.random() * maxMargin; // Random vertical position between 0 and maxMargin
            const marginBottom = Math.random() * maxMargin; // Random horizontal position between 0 and maxMargin
            const maxHeight = containerHeight - topMargin - marginBottom; // Calculate maximum height based on margins
            const maxLeftMargin = window.innerWidth * 0.25; // 50%

            // Clamp the random left margin between 0 and 50%
            const leftMargin = Math.random() * maxLeftMargin;

            const itemStyle = {
              display: "flex",
              alignItems: "center",
              padding: "8px",
              width: `${Math.random() * 1000}%`,
              minWidth: "500px",
              maxWidth: "800px",
              marginTop: `${topMargin}px`, // Set top margin
              marginBottom: `${marginBottom}px`, // Set bottom margin

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

export default MediaMarquee;
