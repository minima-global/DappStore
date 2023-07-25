import * as React from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { get, sql } from "./lib";

export const appContext = createContext<any>({});

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);
  const [sort, setSort] = useState('default');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = useCallback(() => {
    sql('SELECT * FROM repositories').then((response) => {
      setRepositories(response.rows);
    });
  }, []);

  // init mds
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;

      (window as any).MDS.init((evt: any) => {
        if (evt.event === 'inited') {
          // const dropQuery = 'DROP TABLE \`repositories\`';
          // sql(dropQuery);

          const dbQuery = 'CREATE TABLE IF NOT EXISTS \`repositories\` (`id` bigint auto_increment, `name` varchar(512) NOT NULL, `url` varchar(2048) NOT NULL, `created_at` TIMESTAMP)';

          /**
           * Create repositories db table if it does not exist
           */
          sql(dbQuery).then(() => {
            const check = "SELECT * FROM \`repositories\` WHERE `url` = 'https://storage.googleapis.com/minidapps-363120.appspot.com/dapps.json'";

            /**
             * Check if official repo is here
             */
            sql(check).then((response) => {

              if(response.count === 0) {
                const add = "INSERT INTO \`repositories\` (name, url) VALUES ('Minima Global', 'https://storage.googleapis.com/minidapps-363120.appspot.com/dapps.json')";

                /**
                 * Add official repo if it's missing
                 */
                sql(add).then(() => {
                  getRepositories();
                });
              }
            });
          });
        }
      });
    }
  }, [loaded, getRepositories]);

  useEffect(() => {
    if (loaded.current) {
      getRepositories();
    }
  }, [loaded.current, getRepositories]);

  const value = {
    loaded,
    sort,
    setSort,
    repositories,
    getRepositories,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
