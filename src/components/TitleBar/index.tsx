import { FC, PropsWithChildren } from 'react';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';
import { Link } from "react-router-dom";

const TitleBar: FC<PropsWithChildren> = ({ children }) => {
  const openTitleBar = useAndroidShowTitleBar();

  return (
    <div className="sticky top-0 z-40" onClick={openTitleBar}>
      <div className="flex">
        <div className="py-4 pl-4">
          <Link to="/">
            <div className="cursor-pointer flex items-center">
              <img src="./icon.png" className="w-8 h-8 rounded" alt="Logo" />
              <div className="ml-3 text-md md:text-lg font-bold">Dapp Store</div>
            </div>
          </Link>
        </div>
        <div className="relative flex-grow flex items-center justify-end py-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
