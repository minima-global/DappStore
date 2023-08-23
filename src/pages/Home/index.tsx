import TitleBar from '../../components/TitleBar';
import Sort from '../../components/TitleBar/Sort';
import { Link } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import { downloadFile, hexToBase64, loadBinary, sql } from '../../lib';
import { appContext } from '../../AppContext';
import { escape } from 'sqlstring';
import { IS_MINIMA_BROWSER } from "../../env";
import { exampleMiniDappStoreJson } from "../../example_minidapp_store";
import { toHex } from "../../utilities";
import StorePanel from "../../components/StorePanel/StorePanel";

function Home() {
  const { loaded, sort, repositories, getRepositories } = useContext(appContext);
  const [dappLink, setDAppLink] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayAddStore, setDisplayAddStore] = useState(false);
  const [displayOwnStore, setAddOwnStore] = useState(false);

  const dappLinkHasError =
    dappLink !== '' &&
    !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(dappLink) &&
    !dappLink.includes('.json');
  const hasMoreThanOneStore = loaded.current && repositories.length > 1;

  const addDappStore = () => {
    setError(null);
    setIsLoading(true);

    sql(`SELECT * FROM repositories WHERE url = ${escape(dappLink)}`).then((response) => {
      if (response.count > 0) {
        setIsLoading(false);
        return setError('You have already added this MiniDapp store');
      }

      downloadFile(dappLink).then(function (response: any) {
        loadBinary(response.download.file).then(function (response: any) {
          const data = hexToBase64(response.load.data);

          if (!data.name) {
            setIsLoading(false);
            return setError('Invalid MiniDapp store, please try again later');
          }

          sql(
            `INSERT INTO repositories (name, url, icon) VALUES (${escape(data.name)}, ${escape(dappLink)}, ${escape(
              data.icon
            )})`
          ).then(() => {
            getRepositories();
            setDAppLink('');
            setIsLoading(false);
            setDisplayAddStore(false);
          });
        });
      });
    });
  };

  const orderedRepositories = useMemo(() => {
    let results = repositories;

    if (query !== '') {
      results = results.filter((a) => a.NAME.toLowerCase().includes(query.toLowerCase()));
    }

    if (sort === 'alphabetical') {
      return results.sort((a, b) => a.NAME.localeCompare(b.NAME));
    }

    if (sort === 'last_added') {
      return results.sort((a, b) => b.ID - a.ID);
    }

    return results;
  }, [query, sort, repositories]);

  const downloadExample = () => {
    if (IS_MINIMA_BROWSER) {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Android.blobDownload('example_dapp_store.json', toHex(JSON.stringify(exampleMiniDappStoreJson, null, 4)));
    } else {
      var blob = new Blob([JSON.stringify(exampleMiniDappStoreJson)]);
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'example_dapp_store.json';
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
    }

    setAddOwnStore(false);
  };

  return (
    <div className="relative app text-white">
      <div>
        <Modal display={displayAddStore} frosted={true}>
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl mb-3">Add a MiniDapp store</h1>
            <p className="mb-4">Dapp stores are a collection of MiniDapps that can be installed on your node.</p>
            <p className="mb-4">Please enter the public URL of a Dapp store JSON file.</p>
            <div className="mb-4 text-left">
              {error && (
                <div className="p-3 bg-red-950 bg-opacity-10 text-status-red font-bold rounded text-sm border border-status-red mb-4">
                  {error}
                </div>
              )}
              <div className="flex-grow w-full relative">
                <input
                  type="text"
                  value={dappLink}
                  onChange={(evt) => setDAppLink(evt.target.value)}
                  className={`pr-10 outline-none bg-core-black-contrast-1 p-3 border-2 rounded w-full ${
                    dappLinkHasError ? 'border-status-red' : 'border-core-black-contrast-3'
                  }`}
                />
                <div className="absolute px-1 h-full right-0 top-0 flex items-center justify-end">
                  <svg
                    onClick={() => {
                      setError(null);
                      setDAppLink('');
                    }}
                    className={`cursor-pointer m-2 ${dappLink !== '' ? 'visible' : 'hidden'}`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="mask0_546_16940" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_546_16940)">
                      <path
                        d="M8.39998 16.6538L12 13.0538L15.6 16.6538L16.6538 15.6L13.0538 12L16.6538 8.39998L15.6 7.34615L12 10.9461L8.39998 7.34615L7.34615 8.39998L10.9461 12L7.34615 15.6L8.39998 16.6538ZM12.0016 21.5C10.6877 21.5 9.45268 21.2506 8.29655 20.752C7.1404 20.2533 6.13472 19.5765 5.2795 18.7217C4.42427 17.8669 3.74721 16.8616 3.24833 15.706C2.74944 14.5504 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45268 3.248 8.29655C3.74667 7.1404 4.42342 6.13472 5.27825 5.2795C6.1331 4.42427 7.13834 3.74721 8.29398 3.24833C9.44959 2.74944 10.6844 2.5 11.9983 2.5C13.3122 2.5 14.5473 2.74933 15.7034 3.248C16.8596 3.74667 17.8652 4.42342 18.7205 5.27825C19.5757 6.1331 20.2527 7.13834 20.7516 8.29398C21.2505 9.44959 21.5 10.6844 21.5 11.9983C21.5 13.3122 21.2506 14.5473 20.752 15.7034C20.2533 16.8596 19.5765 17.8652 18.7217 18.7205C17.8669 19.5757 16.8616 20.2527 15.706 20.7516C14.5504 21.2505 13.3156 21.5 12.0016 21.5Z"
                        fill="#A7A7B0"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              {dappLinkHasError && <div className="text-status-red mt-4">Invalid URL</div>}
            </div>
            <Button
              loading={isLoading}
              onClick={addDappStore}
              disabled={dappLinkHasError || dappLink === ''}
              variant="primary"
            >
              Add store
            </Button>
            <Button
              onClick={() => {
                setDisplayAddStore(false);
                setError(null);
                setDAppLink('');
              }}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </Modal>
        <Modal display={displayOwnStore} frosted={true}>
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl mb-3">Create your own store</h1>
            <p className="mb-3">Collect your MiniDapps in one place by creating your own dapp store.</p>
            <h5 className="font-bold mb-3">Steps</h5>
            <ol className="list-decimal text-sm ml-4 mb-6">
              <li>Complete the json file for your MiniDapps using the template provided</li>
              <li>Host the json file in the same location as your MiniDapps</li>
              <li>Add a new store into your Dapp Store MiniDapp by pasting in the public URL of the json file</li>
              <li>Share your URL with friends so they can add your store to their node!</li>
            </ol>
            <Button onClick={downloadExample} variant="primary">Download example JSON</Button>
            <Button
              variant="secondary"
              onClick={() => setAddOwnStore(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
        <TitleBar>
          <div>
            <button
              onClick={(evt) => {
                evt.stopPropagation();
                setAddOwnStore(true);
              }}
              className="w-full flex gap-3 items-center text-xs md:text-base h-[32px] md:pr-2 w-fit w-full rounded font-bold"
            >
              Create your own store
              <img src="./assets/info.svg" />
            </button>
          </div>
        </TitleBar>
        <div className="relative pt-2 p-4 flex flex-col gap-4 max-w-xl mx-auto h-full">
          <Link to="/store/1" className="w-full">
            <img alt="Banner" src="./assets/banner.svg" className="w-full" />
          </Link>
          <h1 className="text-lg">My stores</h1>
          <div className="grid grid-cols-12">
            {displaySearch && (
              <div className="col-span-12 flex">
                <div className="flex-grow mr-4 relative">
                  <input
                    value={query}
                    onChange={(evt) => setQuery(evt.target.value)}
                    type="text"
                    className="bg-transparent p-2 border-2 rounded w-full border-core-black-contrast-3"
                  />
                  <div className="absolute px-2.5 h-full right-0 top-0 flex items-center justify-end">
                    <svg
                      onClick={() => setQuery('')}
                      className={`cursor-pointer ${query !== '' ? 'visible' : 'hidden'}`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="mask0_546_16940" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_546_16940)">
                        <path
                          d="M8.39998 16.6538L12 13.0538L15.6 16.6538L16.6538 15.6L13.0538 12L16.6538 8.39998L15.6 7.34615L12 10.9461L8.39998 7.34615L7.34615 8.39998L10.9461 12L7.34615 15.6L8.39998 16.6538ZM12.0016 21.5C10.6877 21.5 9.45268 21.2506 8.29655 20.752C7.1404 20.2533 6.13472 19.5765 5.2795 18.7217C4.42427 17.8669 3.74721 16.8616 3.24833 15.706C2.74944 14.5504 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45268 3.248 8.29655C3.74667 7.1404 4.42342 6.13472 5.27825 5.2795C6.1331 4.42427 7.13834 3.74721 8.29398 3.24833C9.44959 2.74944 10.6844 2.5 11.9983 2.5C13.3122 2.5 14.5473 2.74933 15.7034 3.248C16.8596 3.74667 17.8652 4.42342 18.7205 5.27825C19.5757 6.1331 20.2527 7.13834 20.7516 8.29398C21.2505 9.44959 21.5 10.6844 21.5 11.9983C21.5 13.3122 21.2506 14.5473 20.752 15.7034C20.2533 16.8596 19.5765 17.8652 18.7217 18.7205C17.8669 19.5757 16.8616 20.2527 15.706 20.7516C14.5504 21.2505 13.3156 21.5 12.0016 21.5Z"
                          fill="#A7A7B0"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <label
                    className="cursor-pointer"
                    onClick={() => {
                      setDisplaySearch(false);
                      setQuery('');
                    }}
                  >
                    Cancel
                  </label>
                </div>
              </div>
            )}
            {!displaySearch && (
              <>
                <div className="col-span-5">
                  <Sort />
                </div>
                <div className="col-span-7 flex items-center justify-end gap-4">
                  <svg
                    onClick={() => setDisplaySearch(true)}
                    className="cursor-pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3913 10.6957C18.3913 14.9458 14.9459 18.3913 10.6957 18.3913C6.44546 18.3913 3 14.9458 3 10.6957C3 6.44546 6.44546 3 10.6957 3C14.9459 3 18.3913 6.44546 18.3913 10.6957Z"
                      stroke="#E9E9EB"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
                      fill="#E9E9EB"
                    />
                  </svg>
                  <svg
                    className="cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setDisplayAddStore(true)}
                  >
                    <path
                      d="M8.88892 20V11.1111H0V8.88892H8.88892V0H11.1111V8.88892H20V11.1111H11.1111V20H8.88892Z"
                      fill="#E9E9EB"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
          {orderedRepositories.map((repository) => (
            <Link key={repository.ID} to={`/store/${repository.ID}`} className="overflow-hidden flex-grow lg:px-0">
              <StorePanel repository={repository} />
            </Link>
          ))}
          {!hasMoreThanOneStore && (
            <div className="text-center mt-16">
              <div className="text-lg mb-6">You haven’t added a store yet</div>
              <button
                onClick={() => setDisplayAddStore(true)}
                className="border border-white h-[48px] max-w-[172px] w-full rounded"
              >
                Add a store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
