import { FC, PropsWithChildren } from 'react';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';
import { Link } from "react-router-dom";

const TitleBar: FC<PropsWithChildren> = ({ children }) => {
  const openTitleBar = useAndroidShowTitleBar();

  return (
    <div className="sticky top-0 z-40 title-bar safe-top" onClick={openTitleBar}>
      <div className="flex items-center">
        <div className="py-4 pl-4 min-w-0">
          <Link to="/">
            <div className="cursor-pointer flex items-center min-w-0">
              <img src="./icon.png" className="w-8 h-8 rounded shrink-0" alt="Logo" />
              <div className="ml-3 text-md md:text-lg font-bold truncate">Dapp Store</div>
            </div>
          </Link>
        </div>
        <div className="relative flex-grow flex items-center justify-end py-4 pr-4 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
