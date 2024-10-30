import useSplash from './useSplash';
import Button from '../UI/Button';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import splashJson from '../../splash.json';
import mobileSplash from '../../splash_mobile.json';

const Splash = () => {
  const { display, dismiss } = useSplash();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('lock', display);
  }, [display]);

  if (!display) {
    return null;
  }

  const handleOnClick = () => {
    setAccepted((prevState) => !prevState);
  };

  console.log(accepted);

  return (
    <div className="fixed top-0 left-0 bg-black z-50 w-screen h-screen flex flex-col px-8 pb-12">
      <div className="max-w-4xl mx-auto hidden lg:block">
        <Lottie animationData={splashJson} />
      </div>
      <div className="mx-auto block lg:hidden">
        <Lottie animationData={mobileSplash} />
      </div>
      <div className="max-w-lg mx-auto text-center">
        <div className="text-3xl mb-6">
          Welcome to the
          <br /> Dapp Store
        </div>
        <div className="text-core-grey-80 mb-4">
          <p className="mb-4">Designed to showcase what community developers are building.</p>
          <p>You can easily find stores from developers in the ecosystem and install them to access their Dapps.</p>
        </div>
        <div className="mb-6">
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
        <div className="mb-6">
          <label className="relative cursor-pointer flex items-center gap-4 font-bold select-none rounded border border-gray-500 bg-gray-300 bg-opacity-10 border-opacity-20 p-4 w-full">
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
              className={`pointer-events-none absolute top-[20px] left-[18px] w-[16px] h-[18px] text-black ${
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
              className="h-5 w-5 appearance-none border border-grey after:content-[\\\\2713] checked:border-black checked:bg-white checked:border-white  checked:text-white"
            />
            I agree
          </label>
        </div>
        <div className="text-sm">
          I confirm that I have fully read and understood the MiniDapp Terms of Use. I unconditionally agree to comply
          with these Terms including any future changes. This commitment is irrevocable and applies to all my
          interactions with Minima, eliminating the need for repeated confirmations with each use.
        </div>
        <div className="hidden lg:block mt-16">
          <Button disabled={!accepted} onClick={dismiss}>
            Continue
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-5 w-full mx-auto lg:hidden">
        <Button disabled={!accepted} onClick={dismiss}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Splash;
