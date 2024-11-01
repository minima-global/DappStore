import { useEffect, useState } from 'react';
import Button from '../UI/Button';

export const Settings = ({ close }) => {
  const [enableNotifications, setEnableNotifications] = useState(true);

  useEffect(() => {
    MDS.keypair.get('notifications_enabled', function (msg) {
      setEnableNotifications(msg.value === '1');
    });
  }, []);

  const toggleNotifications = () => {
    MDS.keypair.set('notifications_enabled', !enableNotifications ? '1' : '0', function (msg) {
      setEnableNotifications((prevState) => !prevState);
    });
  };

  return (
    <div className="flex flex-col gap-3 text-center">
      <h1 className="text-2xl mb-3">Settings</h1>
      <div className="flex items-center">
        <label className="relative text-sm text-left cursor-pointer flex items-center pl-5 gap-6 select-none rounded border border-gray-500 bg-gray-300 bg-opacity-10 border-opacity-20 p-4 w-full">
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={toggleNotifications}
              className={`pointer-events-none absolute top-[2px] left-[2px] w-[16px] h-[18px] text-black ${
                enableNotifications ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <input
              type="checkbox"
              checked={enableNotifications}
              onClick={toggleNotifications}
              readOnly
              className="inline-block min-w-[20px] min-h-5 h-5 w-5 appearance-none border border-grey checked:bg-white checked:border-white  checked:text-white"
            />
          </div>
          Application update notifications
        </label>
      </div>
      <Button onClick={close} variant="secondary">
        Close
      </Button>
    </div>
  );
};

export default Settings;
