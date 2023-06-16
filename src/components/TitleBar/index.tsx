import { FC, PropsWithChildren } from 'react';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';

const TitleBar: FC<PropsWithChildren> = ({ children }) => {
  const openTitleBar = useAndroidShowTitleBar();

  return (
    <div className="sticky top-0 z-40" onClick={openTitleBar}>
      <div className="grid grid-cols-12">
        <div className="col-span-10 flex items-center p-4">
          <img src="./icon.png" className="w-8 h-8 rounded" alt="Logo" />
          <div className="ml-3 text-lg font-bold">Dapp Store</div>
        </div>
        <div className="col-span-2 relative flex items-center justify-end p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
