import { useEffect, useState } from 'react';

function useBadgeNotification() {
  const [badgeNotification, setBadgeNotification] = useState<string | null>(null);

  useEffect(() => {
    if (badgeNotification) {
      setTimeout(() => {
        setBadgeNotification(null);
      }, 5000);
    }
  }, [badgeNotification, setBadgeNotification]);

  return {
    badgeNotification,
    setBadgeNotification,
  };
}

export default useBadgeNotification;
