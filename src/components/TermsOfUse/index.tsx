import Button from '../UI/Button';
import { useContext, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import splashJson from '../../splash.json';
import mobileSplash from '../../splash_mobile.json';
import { appContext } from '../../AppContext';

const VERSION = '1.0.0';

const TermsOfUse = () => {
  const { loaded } = useContext(appContext);
  const [display, setDisplay] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (loaded) {
      MDS.keypair.get('terms_accepted', function (msg) {
        if (!msg.value) {
          setDisplay(true);
        }

        if (msg.value !== VERSION) {
          setDisplay(true);
        }
      });
    }
  }, [loaded]);

  const handleOnClick = () => {
    setAccepted((prevState) => !prevState);
  };

  const handleContinue = () => {
    setDisplay(false);
    MDS.keypair.set('terms_accepted', VERSION);
  };

  return (
    <div
      className={`fixed z-[98] top-0 left-0 bg-black w-screen h-screen flex flex-col px-8 pb-12 ${
        display ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-4xl mx-auto hidden lg:block">
        <Lottie animationData={splashJson} />
      </div>
      <div className="mx-auto block lg:hidden">
        <Lottie animationData={mobileSplash} />
      </div>
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          Please carefully review and confirm your acceptance of the following{' '}
          <a
            href="https://docs.minima.global/docs/terms/minidappterms"
            rel="noreferrer"
            target="_blank"
            className="underline font-bold"
          >
            MiniDapp terms
          </a>{' '}
          by checking the box provided:
        </div>
        <div>
          <label className="relative text-sm text-left cursor-pointer flex items-center pl-5 gap-6 select-none rounded border border-gray-500 bg-gray-300 bg-opacity-10 border-opacity-20 p-4 w-full">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={handleOnClick}
                className={`pointer-events-none absolute top-[2px] left-[2px] w-[16px] h-[18px] text-black ${
                  accepted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <input
                type="checkbox"
                checked={accepted}
                onClick={handleOnClick}
                readOnly
                className="inline-block min-w-[20px] min-h-5 h-5 w-5 appearance-none border border-grey checked:bg-white checked:border-white  checked:text-white"
              />
            </div>
            I confirm that I have fully read and understood the MiniDapp Terms of Use and agree to comply with these
            Terms including any future changes. This commitment is irrevocable and applies to all my interactions with
            Minima, eliminating the need for repeated confirmations with each use.
          </label>
        </div>
        <div className="hidden lg:block mt-16">
          <Button disabled={!accepted} onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-5 w-full mx-auto lg:hidden">
        <Button disabled={!accepted} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TermsOfUse;
