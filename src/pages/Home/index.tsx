import { useContext, useState } from 'react';
import FullStatus from './FullStatus';
import Block from '../../components/UI/Block';
import { appContext } from '../../AppContext';
import TitleBar from '../../components/TitleBar';
import MenuItem from '../../components/UI/MenuItem';
import ChainStatus from './ChainStatus';
import NodeStatus from '../../components/NodeStatus';
import translation from '../../../translation.json';
import Sort from '../../components/TitleBar/Sort';

function Home() {
  const { statusData, maxContactData, maxContactStats } = useContext(appContext);

  return (
    <div className="relative app text-white">
      <div>
        <TitleBar />
        <div className="relative pt-2 p-4 flex flex-col gap-4 max-w-xl mx-auto">
          <img alt="Banner" src="./assets/banner.svg" />
          <h1 className="text-lg">My stores</h1>
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <Sort />
            </div>
            <div className="col-span-6 flex items-center justify-end gap-4">
              <svg
                // onClick={openSearch}
                className="cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3913 10.6957C18.3913 14.9458 14.9459 18.3913 10.6957 18.3913C6.44546 18.3913 3 14.9458 3 10.6957C3 6.44546 6.44546 3 10.6957 3C14.9459 3 18.3913 6.44546 18.3913 10.6957Z"
                  stroke="#E9E9EB"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
                  fill="#E9E9EB"
                />
              </svg>
              <svg
                className="cursor-pointer"
                // onClick={() => setShowInstall(true)}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.88892 20V11.1111H0V8.88892H8.88892V0H11.1111V8.88892H20V11.1111H11.1111V20H8.88892Z"
                  fill="#E9E9EB"
                />
              </svg>
            </div>
          </div>
          <div className="overflow-hidden flex-grow lg:px-0">
            <div className="bg-core-black-contrast-2 rounded overflow-hidden flex items-center justify-start h-full">
              <div
                className="w-[96px] h-[72px] grow rounded bg-cover mx-auto"
                style={{
                  backgroundImage: `url('./assets/app.png')`,
                }}
              />
              <div className="bg-core-black-contrast-2 grow p-3 px-4 w-full overflow-hidden">
                <h5 className="font-bold mb-0.5">Official Minima MiniDapps</h5>
                <p className="text-xs text-core-grey-80 text-ellipsis truncate">Minima Global</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <div className="text-lg mb-6">You haven’t added a store yet</div>
            <button className="border border-white h-[48px] max-w-[172px] w-full rounded">Add a store</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
