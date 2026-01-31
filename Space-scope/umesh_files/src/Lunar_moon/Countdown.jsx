import { useEffect, useState } from "react";

const Countdown = ({ target }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const targetDate = new Date(target);

    const interval = setInterval(() => {
      const diff = targetDate - new Date();

      if (diff <= 0) {
        setTime("Now");
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return <div className="countdown-time">{time}</div>;
};

export default Countdown;
