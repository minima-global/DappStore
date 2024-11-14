import Button from '../UI/Button';
import { useContext, useEffect } from 'react';
import Lottie from 'lottie-react';
import splashJson from '../../splash.json';
import mobileSplash from '../../splash_mobile.json';
import { appContext } from '../../AppContext';

const Splash = () => {
  const { displaySplash, setDisplaySplash, setDisplayTerms } = useContext(appContext);

  useEffect(() => {
    document.body.classList.toggle('lock', displaySplash);
  }, [displaySplash]);

  if (!displaySplash) {
    return null;
  }

  const dismiss = () => {
    setDisplaySplash(false);
    setDisplayTerms(true);
    MDS.keypair.set('SPLASH', '1');
  };

  return (
    <div className="fixed top-0 left-0 bg-black z-[99] w-screen h-screen flex flex-col px-8 pb-12">
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
          <p>You can easily add stores from developers in the ecosystem to access their Dapps.</p>
        </div>
        <div className="hidden lg:block mt-16">
          <Button onClick={dismiss}>Continue</Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-5 w-full mx-auto lg:hidden">
        <Button onClick={dismiss}>Continue</Button>
      </div>
    </div>
  );
};

export default Splash;
