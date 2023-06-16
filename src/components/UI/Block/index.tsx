import * as React from 'react';
import Clipboard from 'react-clipboard.js';
import { useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import { appContext } from '../../../AppContext';

type BlockProps = {
  title: string;
  value?: string | number;
  copy?: boolean;
  info?: {
    title: string;
    textContent: string;
  };
};

const Block: React.FC<React.PropsWithChildren<BlockProps>> = ({ children, title, value, copy = false, info }) => {
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { setBadgeNotification } = useContext(appContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const displayInfo = () => setShowInfo(true);
  const hideInfo = () => setShowInfo(false);

  const handleClipboard = () => {
    setBadgeNotification('Copied to clipboard');
    setCopied(true);
  }

  return (
    <div className="p-4 text-sm bg-grey relative flex items-center w-full">
      <Modal display={showInfo} frosted closeAtBottom={hideInfo}>
        <div className="text-center">
          <h1 className="text-2xl pb-6">{info?.title}</h1>
          <p className="text-core-grey-40 text-base mb-3">{info?.textContent}</p>
        </div>
      </Modal>
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-4 flex items-center justify-start">
          {title}
          {info && (
            <svg
              onClick={displayInfo}
              className="mx-2 cursor-pointer"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.0001 11C7.2225 11 7.4113 10.9221 7.5665 10.7664C7.72223 10.6112 7.8001 10.4224 7.8001 10.2C7.8001 9.9776 7.72223 9.7888 7.5665 9.6336C7.4113 9.47787 7.2225 9.4 7.0001 9.4C6.7777 9.4 6.5889 9.47787 6.4337 9.6336C6.27796 9.7888 6.2001 9.9776 6.2001 10.2C6.2001 10.4224 6.27796 10.6112 6.4337 10.7664C6.5889 10.9221 6.7777 11 7.0001 11ZM6.4001 8.4496H7.6169C7.6169 8.03893 7.6529 7.74747 7.7249 7.5752C7.79743 7.40293 7.97236 7.18347 8.2497 6.9168C8.63903 6.5392 8.90863 6.21706 9.0585 5.9504C9.20836 5.68373 9.2833 5.38907 9.2833 5.0664C9.2833 4.45573 9.07503 3.95867 8.6585 3.5752C8.24196 3.19173 7.7113 3 7.0665 3C6.5001 3 6.00863 3.14986 5.5921 3.4496C5.17503 3.74987 4.8833 4.15547 4.7169 4.6664L5.8001 5.1168C5.90036 4.80533 6.05876 4.56373 6.2753 4.392C6.49183 4.21973 6.74463 4.1336 7.0337 4.1336C7.34463 4.1336 7.6001 4.2224 7.8001 4.4C8.0001 4.5776 8.1001 4.81093 8.1001 5.1C8.1001 5.35547 8.01396 5.5832 7.8417 5.7832C7.66943 5.9832 7.4777 6.1776 7.2665 6.3664C6.8777 6.72213 6.6361 7.01387 6.5417 7.2416C6.4473 7.46933 6.4001 7.872 6.4001 8.4496ZM7.0001 13.4C6.12223 13.4 5.2945 13.2333 4.5169 12.9C3.7393 12.5667 3.05876 12.1083 2.4753 11.5248C1.89183 10.9413 1.43343 10.2608 1.1001 9.4832C0.766764 8.7056 0.600098 7.87787 0.600098 7C0.600098 6.11093 0.766764 5.28027 1.1001 4.508C1.43343 3.73627 1.89183 3.05867 2.4753 2.4752C3.05876 1.89173 3.7393 1.43333 4.5169 1.1C5.2945 0.766665 6.12223 0.599998 7.0001 0.599998C7.88916 0.599998 8.71983 0.766665 9.4921 1.1C10.2638 1.43333 10.9414 1.89173 11.5249 2.4752C12.1084 3.05867 12.5668 3.73627 12.9001 4.508C13.2334 5.28027 13.4001 6.11093 13.4001 7C13.4001 7.87787 13.2334 8.7056 12.9001 9.4832C12.5668 10.2608 12.1084 10.9413 11.5249 11.5248C10.9414 12.1083 10.2638 12.5667 9.4921 12.9C8.71983 13.2333 7.88916 13.4 7.0001 13.4Z"
                fill="#91919D"
              />
            </svg>
          )}
        </div>
        <div className="col-span-8 text-right">
          {children && <>{children}</>}
          {!children && <>{value}</>}
        </div>
      </div>
      <div className="text-white mb-1.5"></div>
      {copy && (
        <div>
          {!copied && (
            <div className="text-core-grey-100 absolute top-3.5 right-3.5 md:top-4 md:right-4 z-10">
              <Clipboard data-clipboard-text={value} onClick={handleClipboard}>
                <div className="flex items-center">
                  <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.5 20.9751C1.1 20.9751 0.75 20.8251 0.45 20.5251C0.15 20.2251 0 19.8751 0 19.4751V4.4001H1.5V19.4751H13.35V20.9751H1.5ZM4.5 17.9751C4.1 17.9751 3.75 17.8251 3.45 17.5251C3.15 17.2251 3 16.8751 3 16.4751V2.4751C3 2.0751 3.15 1.7251 3.45 1.4251C3.75 1.1251 4.1 0.975098 4.5 0.975098H15.5C15.9 0.975098 16.25 1.1251 16.55 1.4251C16.85 1.7251 17 2.0751 17 2.4751V16.4751C17 16.8751 16.85 17.2251 16.55 17.5251C16.25 17.8251 15.9 17.9751 15.5 17.9751H4.5ZM4.5 16.4751H15.5V2.4751H4.5V16.4751Z"
                      fill="#F4F4F5"
                    />
                  </svg>
                </div>
              </Clipboard>
            </div>
          )}
          {copied && (
            <div className="absolute top-3.5 right-3.5 md:top-4 md:right-4 z-10">
              <div className="flex items-center">
                <div className="text-sm text-primary flex items-center gap-2">
                  Copied to clipboard
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.58075 14.2538L15.3038 7.53075L14.25 6.47693L8.58075 12.1462L5.73075 9.29615L4.67693 10.35L8.58075 14.2538ZM10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749442 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749333 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Block;
