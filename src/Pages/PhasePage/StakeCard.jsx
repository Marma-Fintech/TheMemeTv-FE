import React from 'react';
import './PhasePage.css';
import Coin from '../../assets/images/coin.png';

const StakeCard = () => {
  return (
    <div>
      <div
        className="press-start-2p-regular text-white flex flex-col items-center justify-between rounded-md p-1 "
        style={{
          backgroundColor: 'rgba(33, 33, 33, 1)',
          height: '120px',
          width: '140px',
          fontWeight: 'lighter',
        }}
      >
        <div className="bg-black w-full text-center p-1">Day 1</div>
        <div className="flex justify-center items-center">
          <img style={{ height: '40%', width: '40%' }} src={Coin} alt="" />
          <span className="ml-2 totalpoints">234k</span>
        </div>
        <div
          style={{ backgroundColor: 'rgba(48, 48, 48, 1)' }}
          className="w-full text-center rounded-md p-1"
        >
          <button className="">STAKED</button>
        </div>
      </div>
    </div>
  );
};

export default StakeCard;
