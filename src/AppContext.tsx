import * as React from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { downloadFile, hexToBase64, isWriteMode, loadBinary, mds, sql } from "./lib";
import { escape } from "sqlstring";

export const appContext = createContext<any>({});

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);
  const [initSuccess, setInitSuccess] = useState(false);
  const [sort, setSort] = useState('default');
  const [repositories, setRepositories] = useState([]);
  const [installedMiniDapps, setInstalledMiniDapps] = useState([]);
  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);

  const getRepositories = useCallback(() => {
    sql('SELECT * FROM repositories').then((response) => {
      setRepositories(response.rows);
    });
  }, []);

  const getMds = useCallback(() => {
    mds().then((response) => {
      setInstalledMiniDapps(response.minidapps);
    });
  }, []);

  // init mds
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;

      (window as any).MDS.init(async (evt: any) => {
        if (evt.event === 'inited') {
          // const dropQuery = 'DROP TABLE \`repositories\`';
          // await sql(dropQuery);
          setInitSuccess(true);

          isWriteMode().then((appIsInWriteMode) => {
            setAppIsInWriteMode(appIsInWriteMode);

            if (appIsInWriteMode) {
              getMds();
            }
          });

          const dbQuery = 'CREATE TABLE IF NOT EXISTS \`repositories\` (`id` bigint auto_increment, `name` varchar(512) NOT NULL, `url` varchar(2048) NOT NULL, `icon` varchar(2048), `created_at` TIMESTAMP)';

          /**
           * Create repositories db table if it does not exist
           */
          sql(dbQuery).then(() => {
            const url = 'https://minidapps.minima.global/data/dapps.json';
            const check = `SELECT * FROM \`repositories\` WHERE \`url\` = ${escape(url)}`;

            /**
             * Check if official repo is here
             */
            sql(check).then((response) => {

              if(response.count === 0) {

                downloadFile(url).then(function (response: any) {
                  loadBinary(response.download.file).then(function (response: any) {
                    const data = hexToBase64(response.load.data);
                    const query = `INSERT INTO \`repositories\` (name, url, icon) VALUES (${escape(data.name)}, ${escape(url)}, ${escape(data.icon)})`;

                    sql(query).then(() => {
                      getRepositories();
                    });
                  });
                });
              }
            });
          });
        }
      });
    }
  }, [loaded, getRepositories, getMds]);

  useEffect(() => {
    if (loaded.current && initSuccess) {
      getRepositories();
    }
  }, [loaded.current, initSuccess, getRepositories]);

  const value = {
    loaded,
    sort,
    setSort,
    getMds,
    repositories,
    getRepositories,
    appIsInWriteMode,
    installedMiniDapps,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
