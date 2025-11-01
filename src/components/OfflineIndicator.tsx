import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 animate-fadeIn">
      <WifiOff className="w-5 h-5" />
      <span className="font-semibold">You're offline</span>
    </div>
  );
};
