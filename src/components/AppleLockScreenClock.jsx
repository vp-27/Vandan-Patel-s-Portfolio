import React, { useState, useEffect } from 'react';

const AppleLockScreenClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
}).replace(' AM', '').replace(' PM', '');

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="full-screen">
        <div className="date-time">
            <h4>{formattedDate}</h4>
            <h2>{formattedTime}</h2>
        </div>
    </div>
  );
};

export default AppleLockScreenClock;