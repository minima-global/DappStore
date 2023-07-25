import * as React from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import { get, sql } from "./lib";

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
          // const dropQuery = 'DROP TABLE \`repositories\`';
          // sql(dropQuery);

          const dbQuery = 'CREATE TABLE IF NOT EXISTS \`repositories\` (`id` bigint auto_increment, `name` varchar(512) NOT NULL, `url` varchar(2048) NOT NULL, `created_at` TIMESTAMP)';

          sql(dbQuery);
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
