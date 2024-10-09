import React from "react";
const DashedProgressBar = ({ progress }) => {
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundImage: `repeating-linear-gradient(
      90deg,
      #FFFFFF,      /* Dash color */
      #FFFFFF 10px, /* Dash length */
      transparent 10px, /* Gap start */
      transparent 20px  /* Gap length */
    )`,
    backgroundColor: "transparent",
    backgroundSize: "15px 100%", // Adjust to control dash and gap sizes
  };
  return (
    <div className="progress" style={{ height: "20px" }}>
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
