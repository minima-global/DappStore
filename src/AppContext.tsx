import * as React from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { downloadFile, hexToBase64, isWriteMode, loadBinary, mds, sql } from './lib';
import { escape } from 'sqlstring';
import { VERSION } from './components/TermsOfUse';

export const appContext = createContext<any>({});

/* @ts-ignore */
const addStore = (url: string) => {
  return new Promise<void>(async (resolve) => {
    try {
      const check = `SELECT * FROM \`repositories\` WHERE \`url\` = ${escape(url)}`;

      /**
       * Check if community dapps repo is here
       */
      const response = await sql(check);

      if (response.count === 0) {
        const downloadedFile = await downloadFile(url);
        const loadedFile: any = await loadBinary(downloadedFile.download.file);
        const data = hexToBase64(loadedFile.load.data);
        const query = `INSERT INTO \`repositories\` (name, url, icon) VALUES (${escape(data.name)}, ${escape(url)}, ${escape(data.icon)})`;

        await sql(query);
        resolve();
      }

      resolve();
    } catch (error) {
      resolve();
    }
  });
};

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loaded = useRef(false);
  const [appReady, setAppReady] = useState(false);
  const [sort, setSort] = useState('default');
  const [repositories, setRepositories] = useState<any[]>([]);
  const [installedMiniDapps, setInstalledMiniDapps] = useState([]);
  const [appIsInWriteMode, setAppIsInWriteMode] = useState<boolean | null>(null);
  const [displaySplash, setDisplaySplash] = useState<boolean | null>(false);
  const [displayTerms, setDisplayTerms] = useState<boolean | null>(false);

  const getRepositories = useCallback(() => {
    sql('SELECT * FROM repositories').then((response) => {
      /*
       * Reorder repositories so that the main stores are listed at the top from
       * https://minidapps.minima.global/data/dapps.json
       * https://minidapps.minima.global/data/ecosystem-dapps.json
       * https://minidapps.minima.global/data/beta-test-dapps.json
       * and the rest of the stores are listed at the bottom
       */
      const reorderedRepositories: any[] = [];
      const hasMainStore = response.rows.find((repo) => repo.URL === 'https://minidapps.minima.global/data/dapps.json');
      const hasEcosystemStore = response.rows.find((repo) => repo.URL === 'https://minidapps.minima.global/data/ecosystem-dapps.json');
      const hasBetaTestStore = response.rows.find((repo) => repo.URL === 'https://minidapps.minima.global/data/beta-test-dapps.json');
      const restOfStores = response.rows.filter((repo) => ![
        'https://minidapps.minima.global/data/dapps.json',
        'https://minidapps.minima.global/data/ecosystem-dapps.json',
        'https://minidapps.minima.global/data/beta-test-dapps.json'
      ].includes(repo.URL));

      if (hasMainStore) {
        reorderedRepositories.push(hasMainStore);
      }
      if (hasEcosystemStore) {
        reorderedRepositories.push(hasEcosystemStore);
      }
      if (hasBetaTestStore) {
        reorderedRepositories.push(hasBetaTestStore);
      }

      reorderedRepositories.push(...restOfStores);

      setRepositories(reorderedRepositories);
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
          MDS.keypair.get('SPLASH', function (msg) {
            if (!msg.value) {
              setDisplaySplash(true);
            } else if (msg.value === '0') {
              setDisplaySplash(true);
            } else {
              MDS.keypair.get('terms_accepted', function (msg) {
                if (!msg.value) {
                  setDisplayTerms(true);
                } else if (msg.value !== VERSION) {
                  setDisplayTerms(true);
                } else {
                  setAppReady(true);
                }
              });
            }
          });

          // const dropQuery = 'DROP TABLE \`repositories\`';
          // await sql(dropQuery);
          getRepositories();

          isWriteMode().then((appIsInWriteMode) => {
            setAppIsInWriteMode(appIsInWriteMode);

            if (appIsInWriteMode) {
              getMds();
            }
          });

          const dbQuery =
            'CREATE TABLE IF NOT EXISTS `repositories` (`id` bigint auto_increment, `name` varchar(512) NOT NULL, `url` varchar(2048) NOT NULL, `icon` varchar(2048), `created_at` TIMESTAMP)';

          /**
           * Create repositories db table if it does not exist
           */
          sql(dbQuery).then(async() => {

            // do not auto add stores
            // await addStore('https://minidapps.minima.global/data/dapps.json');
            // await addStore('https://minidapps.minima.global/data/ecosystem-dapps.json');
            // await addStore('https://minidapps.minima.global/data/beta-test-dapps.json');
            getRepositories();
          });
        }
      });
    }
  }, [loaded, getRepositories, getMds]);

  const value = {
    loaded: appReady,
    sort,
    setSort,
    getMds,
    repositories,
    getRepositories,
    appIsInWriteMode,
    installedMiniDapps,
    displaySplash,
    setDisplaySplash,
    displayTerms,
    setDisplayTerms,
    appReady,
    setAppReady,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
