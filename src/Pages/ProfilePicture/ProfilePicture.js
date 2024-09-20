import React, { useState } from "react";
import "./ProfilePicture.css";
import profileImage from "../../assets/Profileicons/doge-1.png";
import profileImage1 from "../../assets/Profileicons/doge-2.png";
import profileImage2 from "../../assets/Profileicons/doge-3.png";
import profileImage3 from "../../assets/Profileicons/doge-4.png";
import profileImage4 from "../../assets/Profileicons/doge-5.png";
import profileImage5 from "../../assets/Profileicons/doge-6.png";
import profileImage6 from "../../assets/Profileicons/doge-7.png";
import profileImage7 from "../../assets/Profileicons/doge-8.png";
import profileImage8 from "../../assets/Profileicons/doge-9.png";
import profileImage9 from "../../assets/Profileicons/doge-10.png";
import profileImage10 from "../../assets/Profileicons/doge.png";
import profileImage11 from "../../assets/Profileicons/doge copy.png";

const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const images = [
    profileImage,
    profileImage1,
    profileImage2,
    profileImage3,
    profileImage4,
    profileImage5,
    profileImage6,
    profileImage7,
    profileImage8,
    profileImage9,
    profileImage10,
    profileImage11,
  ];

  return (
    <div
      className="menupointer"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        pointerEvents: "all",
      }}
    >
      <div className="div-2 text-head">Choose your meme profile Picture</div>
      <div className="div-3">
        {images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            loading="lazy"
            src={image}
            alt={`Profile ${index}`}
            className={`img-${index + 2} ${
              selectedImage === image ? "selected" : ""
            }`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      <div className="div-4">
        <div className="div-5">
          {images.slice(3, 4).map((image, index) => (
            <img
              key={index + 3}
              loading="lazy"
              src={image}
              alt={`Profile ${index + 3}`}
              className={`img-6 ${selectedImage === image ? "selected" : ""}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="div-6">
          {images.slice(4, 6).map((image, index) => (
            <img
              key={index + 4}
              loading="lazy"
              src={image}
              alt={`Profile ${index + 4}`}
              className={`img-${index + 7} ${
                selectedImage === image ? "selected" : ""
              }`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      <div className="div-7">
        {images.slice(6, 9).map((image, index) => (
          <img
            key={index + 6}
            loading="lazy"
            src={image}
            alt={`Profile ${index + 6}`}
            className={`img-${index + 9} ${
              selectedImage === image ? "selected" : ""
            }`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      <div className="div-8">
        {images.slice(9, 12).map((image, index) => (
          <img
            key={index + 9}
            loading="lazy"
            src={image}
            alt={`Profile ${index + 9}`}
            className={`img-${index + 12} ${
              selectedImage === image ? "selected" : ""
            }`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdateProfile;
