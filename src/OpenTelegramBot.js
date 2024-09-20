import React from "react";

const OpenTelegramBot = () => {
  const botUsername = "degenTvBot"; // Your bot's username

  const handleClick = (e) => {
    e.preventDefault();
    // Set a flag in local storage to indicate the link was clicked
    localStorage.setItem("visitedTelegramBot", "true");
    // Open Telegram bot in the same window with a query parameter
    window.location.href = `https://t.me/${botUsername}`;
  };

  return (
    <div>
      <a href={`https://t.me/${botUsername}`} onClick={handleClick}>
        Open Telegram Bot
      </a>
    </div>
  );
};

export default OpenTelegramBot;
