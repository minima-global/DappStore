import { PropsWithChildren } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import Button from '../Button';

type ModalProps = {
  display: boolean;
  frosted: boolean;
  closeAtBottom?: () => void;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  frosted = false,
  closeAtBottom,
  display,
  children,
}) => {
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center text-black">
              <div className="relative z-50 w-full max-w-md px-5">
                <animated.div
                  style={style}
                  className="modal mb-8 text-white core-black-contrast-2 box-shadow-lg rounded p-8 mx-auto relative overflow-hidden"
                >
                  {children}
                  <div className="hidden lg:block w-full z-50 mt-8">
                    <Button variant="secondary" onClick={closeAtBottom}>
                      Close
                    </Button>
                  </div>
                </animated.div>
              </div>
              {closeAtBottom && (
                <div className="block lg:hidden absolute bottom-10 w-full px-6 z-50">
                  <Button variant="secondary" onClick={closeAtBottom}>
                    Close
                  </Button>
                </div>
              )}
              {frosted && <div className="fixed z-40 backdrop-blur-2xl bg-black/50 top-0 left-0 w-full h-full"></div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Modal;
