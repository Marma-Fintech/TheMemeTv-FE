import React, { useEffect, useState } from "react";
import "./Username.css";
import tick from "../../assets/images/tickusername.png";

const Username = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isNameStatus, setIsNameStatus] = useState("empty");
  const [codeStatus, setCodeStatus] = useState("empty");

  useEffect(() => {
    if (name.length > 3) {
      setIsNameStatus("success");
    } else {
      setIsNameStatus("empty");
    }
  }, [name]);

  useEffect(() => {
    if (code.length > 6) {
      setCodeStatus("success");
    } else {
      setCodeStatus("empty");
    }
  }, [code]);

  return (
    <div
      className="usernameContainer menupointer"
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        paddingTop: "70px",
      }}
    >
      <div className="welcomText gradient-welcome">WELCOME</div>
      <div className="welcomText2 gradient-welcome2">MEMEOHOLIC!</div>
      <div className="user-introtext">
        Add Your Unique Nickname and Referral code
      </div>
      <div
        className="inputContainer"
        style={{
          height: "200px",
          width: "100%",
        }}
      >
        <div className="inputUsername" style={{ height: "50%", width: "100%" }}>
          <div className="input-text">Nickname</div>
          <div
            className="input-field"
            style={{ height: "35%", width: "100%", position: "relative" }}
          >
            <input
              className="inputStyle"
              style={{
                height: "35px",
                width: "80%",
                backgroundColor: "rgba(38, 38, 38, 1)",
                color: "white",
                borderColor:
                  isNameStatus === "success"
                    ? "rgba(76, 240, 56, 1)"
                    : isNameStatus === "empty"
                    ? "rgba(121, 121, 121, 1)"
                    : "rgba(121, 121, 121, 1)",
              }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {isNameStatus === "success" && (
              <div
                style={{
                  height: "100%",
                  width: "50px",
                  position: "absolute",
                  top: 2,
                  right: 60,
                }}
              >
                <img
                  src={tick}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="inputUsername" style={{ height: "50%", width: "100%" }}>
          <div className="input-text">Enter Referral Code</div>
          <div
            className="input-field"
            style={{ height: "35%", width: "100%", position: "relative" }}
          >
            <input
              className="inputStyle"
              style={{
                height: "35px",
                width: "80%",
                backgroundColor: "rgba(38, 38, 38, 1)",
                color: "white",
                borderColor:
                  codeStatus === "success"
                    ? "rgba(76, 240, 56, 1)"
                    : codeStatus === "empty"
                    ? "rgba(121, 121, 121, 1)"
                    : "rgba(121, 121, 121, 1)",
              }}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            {codeStatus === "success" && (
              <div
                style={{
                  height: "100%",
                  width: "50px",
                  position: "absolute",
                  top: 2,
                  right: 60,
                }}
              >
                <img
                  src={tick}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;
