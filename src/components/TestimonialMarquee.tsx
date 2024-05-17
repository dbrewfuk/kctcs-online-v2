import React, { useState, useEffect } from "react";

const TestimonialMarquee = () => {
  const testimonials = [
    {
      title: "Video 1",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat convallis dui vel posuere.",
      name: "John 1",
      photo: "./src/assets/avatar1.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 1",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat convallis dui vel posuere.",
      name: "John 2",
      photo: "./src/assets/avatar2.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 2",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane 1",
      photo: "./src/assets/avatar3.jpeg", // Replace with actual photo URL
    },
    {
      title: "Video 2",
      testimonial:
        "Fusce commodo mauris vitae libero consequat, ac efficitur nulla posuere. Vivamus vel sollicitudin metus.",
      name: "Jane 2",
      photo: "./src/assets/avatar4.jpeg", // Replace with actual photo URL
    },
    // Add more testimonial objects as needed
  ];

  // Duplicate the testimonials to ensure the marquee restarts seamlessly
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fadeState, setFadeState] = useState("fadeIn"); // Track fade-in and fade-out state
  const [itemPositions, setItemPositions] = useState([]); // State to store positions of testimonial items

  useEffect(() => {
    // Generate random horizontal positions for testimonial items during initial render
    const positions = duplicatedTestimonials.map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }));
    setItemPositions(positions);
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setFadeState("fadeOut"); // Trigger fade-out animation
      setTimeout(() => {
        // Delay setting expanded index until fade-out animation completes
        setExpandedIndex(null);
      }, 250); // Adjust the delay time to match your fade-out animation duration
    } else {
      setFadeState("fadeOut"); // Trigger fade-out animation
      setTimeout(() => {
        // Delay setting expanded index until fade-out animation completes
        setExpandedIndex(index);
        setFadeState("fadeIn"); // Trigger fade-in animation after setting the expanded index
      }, 250); // Adjust the delay time to match your fade-out animation duration
    }
  };

  const marqueeContainerStyle = {
    overflow: "hidden",
    position: "relative", // Needed for absolute positioning
    height: "50vh",
    zIndex: "1",
    animation: "marquee-animation 40s linear infinite",
  };

  const marqueeStyle = {
    display: "flex",
    height: "100%", // Fill the container height
  };

  const expandedTestimonialStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    padding: "48px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    opacity: fadeState === "fadeIn" ? "1" : "0",
    transform:
      fadeState === "fadeIn"
        ? "translate(-50%, -50%)"
        : "translate(-50%, -45%)",
    transition: "all 0.25s ease-in-out", // Added opacity transition
    border: "solid 1px #00467F",
  };

  return (
    <div className="py-[80px] relative">
      <div className="marquee-container" style={marqueeContainerStyle}>
        <div className="marquee" style={marqueeStyle}>
          {duplicatedTestimonials.map((testimonial, index) => {
            const isExpanded = expandedIndex === index;

            const itemStyle = {
              position: "absolute",
              top: itemPositions[index]?.top || `${Math.random() * 80 + 10}%`, // Use stored position or default to random
              left: itemPositions[index]?.left || `${Math.random() * 80 + 10}%`, // Use stored position or default to random
              transform: "translate(-50%, -50%)",
              zIndex: isExpanded ? -1 : 999,
              transition: "all 0.250s ease-in-out",
            };

            return (
              <div
                key={index}
                style={itemStyle}
                onClick={() => toggleExpanded(index)}
              >
                <div
                  className={`marquee-item transition ease-in-out flex bg-[#f3f3f3] p-[8px] rounded-[12.5px] items-center duration-[250ms]  hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:bg-[white] cursor-pointer ${isExpanded ? "expanded bg-[white] border-[1px] border-[#00467F] z-[2] shadow-[0_4px_8px_rgba(0,0,0,0.15)]" : "shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-[0]"}`}
                >
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text font-[600] text-[#00467F] text-[20px]">
                    {testimonial.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="expanded-testimonial absolute w-full top-0 h-full">
        {expandedIndex !== null && (
          <>
            <div style={expandedTestimonialStyle}>
              <div className="absolute group flex items-center gap-[4px] right-[-12px] top-[0] transform translate-x-[calc(100%)] pl-[8px] ">
                <button
                  className="p-[8px]  lg:p-[12px] group-hover:scale-[1.095] border-[2px] lg:border-[3px] border-[#00467F] transition-ease-in-out duration-[200ms] opacity-1 group-hover:opacity-100 bg-[] text-white rounded-full"
                  onClick={() => toggleExpanded(null)} // Close the expanded testimonial
                >
                  <svg
                    className="w-[16px] h-[16px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 27.436 27.436"
                    fill="#00467F"
                  >
                    <path d="M1.414 0L0 1.416l12.303 12.303L0 26.022l1.414 1.414 12.303-12.303 12.305 12.303 1.414-1.416-12.303-12.303L27.436 1.414 26.022.002 13.72 12.305 1.414 0z"></path>
                  </svg>
                </button>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 96 97"
                fill="none"
                className="mb-[32px]"
              >
                <circle cx="48" cy="48.4214" r="48" fill="#FFD000"></circle>
                <path
                  d="M33.41 68.8469C31.3567 68.8469 29.5834 68.2873 28.0901 67.1681C26.7835 66.0489 25.7568 64.5566 25.0102 62.6913C24.4502 60.8259 24.1702 58.6808 24.1702 56.2558C24.1702 52.7117 24.7302 49.1675 25.8501 45.6234C27.1568 41.8927 29.0234 38.5351 31.45 35.5505C34.0633 32.3794 37.1433 29.8612 40.6899 27.9958L44.0498 30.5141C40.3165 32.0063 37.0499 34.5246 34.25 38.0687C31.45 41.6129 29.4901 45.3436 28.3701 49.2608C27.2501 53.178 27.3434 56.7222 28.6501 59.8933H29.2101C29.5834 58.774 30.1434 57.9346 30.89 57.375C31.6367 56.8154 32.6633 56.5356 33.97 56.5356C35.09 56.5356 36.1166 56.8154 37.0499 57.375C37.9833 57.9346 38.6366 58.6808 39.0099 59.6135C39.5699 60.5461 39.8499 61.5721 39.8499 62.6913C39.8499 63.8105 39.5699 64.8364 39.0099 65.7691C38.4499 66.7018 37.7033 67.4479 36.7699 68.0075C35.8366 68.5671 34.7166 68.8469 33.41 68.8469ZM60.8495 68.8469C58.7962 68.8469 57.0229 68.2873 55.5296 67.1681C54.223 66.0489 53.1963 64.5566 52.4497 62.6913C51.8897 60.8259 51.6097 58.6808 51.6097 56.2558C51.6097 52.7117 52.1697 49.1675 53.2896 45.6234C54.5963 41.8927 56.4629 38.5351 58.8895 35.5505C61.5028 32.3794 64.5828 29.8612 68.1294 27.9958L71.4893 30.5141C67.7561 32.0063 64.4894 34.5246 61.6895 38.0687C58.8895 41.6129 56.9296 45.3436 55.8096 49.2608C54.6896 53.178 54.7829 56.7222 56.0896 59.8933H56.6496C57.0229 58.774 57.5829 57.9346 58.3296 57.375C59.0762 56.8154 60.1029 56.5356 61.4095 56.5356C62.5295 56.5356 63.5561 56.8154 64.4894 57.375C65.4228 57.9346 66.0761 58.6808 66.4494 59.6135C67.0094 60.5461 67.2894 61.5721 67.2894 62.6913C67.2894 63.8105 67.0094 64.8364 66.4494 65.7691C65.8894 66.7018 65.1428 67.4479 64.2094 68.0075C63.2761 68.5671 62.1561 68.8469 60.8495 68.8469Z"
                  fill="#00467F"
                ></path>
              </svg>
              <blockquote className="text-[32px] lg:text-4xl text-[#00467F] pb-[16px] font-semibold mb-6">
                "{duplicatedTestimonials[expandedIndex].testimonial}"
              </blockquote>
              <div className="w-full flex justify-end absolute bottom-0 right-0 p-[24px]">
                <div className="flex items-center">
                  <img
                    src={duplicatedTestimonials[expandedIndex].photo}
                    alt={duplicatedTestimonials[expandedIndex].name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-xl font-semibold text-[#00467F]">
                    {duplicatedTestimonials[expandedIndex].name}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialMarquee;
