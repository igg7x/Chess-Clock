import { useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState({
    player1: { name: "Player 1", minutes: 15, seconds: 0 },
    player2: { name: "Player 2", minutes: 15, seconds: 0 },
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  return {
    settings,
    updateSettings,
  };
};
