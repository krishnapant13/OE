import React, { useState, useEffect } from 'react';

const NetworkCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <p>You are online.</p>
      ) : (
        <p>You are offline. Check your network connection.</p>
      )}
    </div>
  );
};

export default NetworkCheck;
