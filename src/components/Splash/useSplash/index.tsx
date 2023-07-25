import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../AppContext';
import { get, set } from "../../../lib";

function useSplash() {
  const { loaded } = useContext(appContext);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (loaded.current) {
      (async () => {
        get('SPLASH').then((response) => {
          if (response?.value === '1') {
            setDisplay(false);
          } else {
            setDisplay(true);
          }
        });
      })();
    }
  }, [loaded]);

  const dismiss = async () => {
    setDisplay(false);
    set('SPLASH', '1');
  };

  return {
    dismiss,
    display,
  };
}

export default useSplash;
