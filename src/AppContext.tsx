import * as React from 'react';
import { createContext, useEffect, useRef, useState } from 'react';

export const appContext = createContext<any>({});

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);
  const [sort, setSort] = useState('alphabetical');

  // init mds
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;

      (window as any).MDS.init((evt: any) => {
        if (evt.event === 'inited') {

        }
      });
    }
  }, [loaded]);

  const value = {
    loaded,
    sort,
    setSort,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
