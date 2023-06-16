import { useContext } from 'react';
import { appContext } from '../../AppContext';

const BadgeNotification = () => {
  const { badgeNotification } = useContext(appContext);

  return (
    <div className={`fixed z-50 bottom-0 left-0 user-select-none w-full p-6 lg:p-8 mx-auto pointer-events-none transition-all origin-center ${badgeNotification ? 'scale-100' : 'scale-0'}`}>
      <div className={`bg-core-grey-20 mx-auto text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}>
        {badgeNotification}
      </div>
    </div>
  );
};

export default BadgeNotification;
