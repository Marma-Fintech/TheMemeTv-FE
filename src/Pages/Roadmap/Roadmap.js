import React from "react";
import "./Roadmap.css";
import LogoImg from "../../components/logoImg/logoImg";

const Roadmap = () => {
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
      <div style={{ height: "80%" }}>
        <LogoImg />
        <div id="glitch-background" className="road-map-text roadmap-intro">
          <div className="">
            <div className="row no-gutters road1 trasition-4">
              <div className="col-6">
                <div className="svg-line">
                  <svg
                    width="194"
                    height="32"
                    viewBox="0 0 194 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="squiggle"
                      d="M0 31H107.434L128.617 9.59524H193V0"
                      stroke="url(#paint0_linear_851_3208)"
                      stroke-width="1.90476"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_851_3208"
                        x1="96.5"
                        y1="31.4166"
                        x2="96.5"
                        y2="4.38885e-07"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FD8D23" />
                        <stop offset="0.115" stop-color="#FAE61C" />
                        <stop offset="0.22" stop-color="#EEF73B" />
                        <stop offset="0.43" stop-color="#4CF038" />
                        <stop offset="0.655" stop-color="#33C6F6" />
                        <stop offset="0.81" stop-color="#7475FF" />
                        <stop offset="1" stop-color="#D457FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="col-6">
                <div className="text-left pb-0 svg-content font-1">
                  <h3 className="mb-0">
                    <span className="dot"></span>Phase 1
                  </h3>
                  <p className="text-head ">
                    Current phase. You are in it. Here, we doNothing{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="row no-gutters road2">
              <div className="col-6">
                <div className="text-left pb-0 svg-content1 font-1">
                  <h3 className="mb-0">
                    <span className="dot"></span>Phase 2
                  </h3>
                  <p className="text-head ">
                    Current phase. You are in it. Here, we doNothing{" "}
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="svg-line1">
                  <svg
                    width="201"
                    height="70"
                    viewBox="0 0 201 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="squiggle1"
                      d="M201 1H133.857L108.619 28.1429H44.8095L0.999987 68.619"
                      stroke="url(#paint0_linear_851_3209)"
                      stroke-width="1.90476"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_851_3209"
                        x1="101"
                        y1="0.0911968"
                        x2="101"
                        y2="68.619"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FD8D23" />
                        <stop offset="0.115" stop-color="#FAE61C" />
                        <stop offset="0.22" stop-color="#EEF73B" />
                        <stop offset="0.43" stop-color="#4CF038" />
                        <stop offset="0.655" stop-color="#33C6F6" />
                        <stop offset="0.81" stop-color="#7475FF" />
                        <stop offset="1" stop-color="#D457FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="no-gutters row road3 trasition-4">
              <div className="col-6">
                <div className="svg-line2">
                  <svg
                    width="211"
                    height="30"
                    viewBox="0 0 211 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="squiggle2"
                      d="M0 1H107.619L128.839 28.619H210.476"
                      stroke="url(#paint0_linear_526_2730)"
                      stroke-width="1.90476"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_526_2730"
                        x1="105.238"
                        y1="0.628799"
                        x2="105.238"
                        y2="28.619"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FD8D23" />
                        <stop offset="0.115" stop-color="#FAE61C" />
                        <stop offset="0.22" stop-color="#EEF73B" />
                        <stop offset="0.43" stop-color="#4CF038" />
                        <stop offset="0.655" stop-color="#33C6F6" />
                        <stop offset="0.81" stop-color="#7475FF" />
                        <stop offset="1" stop-color="#D457FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="col-6">
                <div className=" text-left pb-0 svg-content2 font-1">
                  <h3 className="mb-0">
                    <span className="dot"></span>Phase 3
                  </h3>
                  <p className="text-head ">
                    Current phase. You are in it. Here, we doNothing{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
