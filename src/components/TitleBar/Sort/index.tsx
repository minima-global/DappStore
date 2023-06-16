import { useContext, useState } from 'react';
import { appContext } from '../../../AppContext';

const Sort = () => {
  const { sort, setSort } = useContext(appContext);
  const [showOptions, setShowOptions] = useState(false);

  const openOptions = () => setShowOptions(true);

  const closeOptions = () => setShowOptions(false);

  const setToAlphabetical = () => {
    setSort('alphabetical');
    closeOptions();
  };

  const setToLastAdded = () => {
    setSort('last_added');
    closeOptions();
  };

  return (
    <div className="relative">
      <div onClick={openOptions} className="cursor-pointer flex items-center gap-3">
        {sort === 'alphabetical' && 'A-Z'}
        {sort === 'last_added' && 'Last added'}
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all ${showOptions ? 'rotate-180' : ''}`}
        >
          <path
            d="M5.99981 6.5496L0.349609 0.8748L1.24961 0L5.99981 4.7496L10.75 0L11.65 0.9L5.99981 6.5496Z"
            fill="#A7A7B0"
          />
        </svg>
      </div>
      <div
        className={`absolute inset-x-0 bottom-1 left-0 lg:left-18 z-40 transition-all origin-top-left ${
          showOptions ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="absolute mt-5 left-0 flex flex-col gap-4 pt-4 pl-4 pr-3 pb-4 text-core-grey-5 core-black-contrast-2 shadow-xl min-w-[220px]">
          <div onClick={setToAlphabetical} className="cursor-pointer">
            A-Z
          </div>
          <div onClick={setToLastAdded} className="cursor-pointer">
            Last added
          </div>
        </div>
      </div>
      {showOptions && (
        <div onClick={closeOptions} className="bg-black bg-opacity-30 fixed top-0 left-0 w-screen h-screen z-30"></div>
      )}
    </div>
  );
};

export default Sort;
