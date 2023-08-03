import { useContext } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { appContext } from '../../AppContext';
import { modalAnimation } from '../../animations';

export function AppIsInReadMode() {
  const { appIsInWriteMode } = useContext(appContext);
  const display = appIsInWriteMode === false;
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-[100] flex items-center justify-center text-black">
              <div className="relative z-[110] w-full max-w-lg mx-8">
                <animated.div style={style}>
                  <div className="text-center text-white pb-12 px-4">
                    <div className="text-2xl mb-4">App is in read mode</div>
                    <div className="text-sm text-core-grey-80">
                      The MiniDapp store requires write permission to
                      <ul className="mt-6">
                        <li>&#x2022; Read which MiniDapps are installed</li>
                        <li>&#x2022; Install and update MiniDapps</li>
                      </ul>
                    </div>
                  </div>
                </animated.div>
              </div>
              <div className="fixed z-40 backdrop-blur-2xl bg-black/50 top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AppIsInReadMode;
