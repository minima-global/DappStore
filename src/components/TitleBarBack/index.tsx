import { FC, PropsWithChildren } from 'react';
import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';
import { useNavigate } from "react-router-dom";

type TitleBarBackProps = {
  label: string;
  overrideBack?: () => React.ReactNode;
}

const TitleBarBack: FC<PropsWithChildren<TitleBarBackProps>> = ({ overrideBack, label, children }) => {
  const openTitleBar = useAndroidShowTitleBar();
  const navigate = useNavigate();

  const goBack = (evt) => {
    evt.stopPropagation();
    navigate(-1);
  }

  return (
    <div className="sticky top-0 z-40" onClick={openTitleBar}>
      <div className="grid grid-cols-12">
        <div onClick={goBack} className="cursor-pointer col-span-8 flex gap-4 items-center p-4">
          {overrideBack && overrideBack()}
          {!overrideBack && (
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.49257 17L0 8.5L8.49257 0L10 1.50875L3.01486 8.5L10 15.4913L8.49257 17Z" fill="#F9F9FA"/>
            </svg>
          )}
          <span>{label}</span>
        </div>
        <div className="col-span-4 relative p-4">
          <div className="absolute right-3 top-3 flex gap-3 items-center justify-end">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBarBack;
