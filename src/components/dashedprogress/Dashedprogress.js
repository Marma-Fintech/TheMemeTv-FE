import React from "react";
const DashedProgressBar = ({ progress, dashcolor, lengthColor }) => {
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundImage: `repeating-linear-gradient(
      90deg,
      ${dashcolor},      /* Dash color */
      ${lengthColor} 10px, /* Dash length */
      transparent 10px, /* Gap start */
      transparent 20px  /* Gap length */
    )`,
    backgroundColor: "transparent",
    backgroundSize: "15px 100%", // Adjust to control dash and gap sizes
  };
  return (
    <div
      className="progress"
      style={{
        height: "20px",
        // height: "0.6rem",
        margin: "7px",
        padding: " 2px",
        borderRadius: "0px",
        background: "brown",
      }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        style={progressBarStyle}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};
export default DashedProgressBar;
