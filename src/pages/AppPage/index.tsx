import { escape } from 'sqlstring';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import TitleBarBack from '../../components/TitleBarBack';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import { downloadFile, hexToBase64, loadBinary, sql } from '../../lib';
import { downloadAndInstallMDSFile, downloadAndUpdateMDSFile } from '../../utilities';

function AppPage() {
  const params = useParams();
  const { appIsInWriteMode } = useContext(appContext);
  const { repositories, getMds, installedMiniDapps } = useContext(appContext);
  const [data, setData] = useState<any | null>(null);
  const repository = repositories.find((i) => i.ID === params.id);
  const [showUpdates, setShowUpdates] = useState(true);
  const [spinners, setSpinners] = useState<Record<string, boolean>>({});
  const [errorResponseModal, setErrorResponseModal] = useState<string | false>(false);

  // the app info from repo
  const repositoryApp = data && repository && data.dapps.find((i) => i.name === params.name);

  // the app info for the installed app
  const installedApp = installedMiniDapps.find(
    (i) =>
      i.conf.name.toLowerCase() === params.name?.toLowerCase() ||
      i.conf.description.toLowerCase() === params.name?.toLowerCase()
  );

  // fetches json incase user directly visits this page
  useEffect(() => {
    if (repository && !data) {
      downloadFile(repository.URL).then(function (response: any) {
        loadBinary(response.download.file).then(function (response: any) {
          const data = hexToBase64(response.load.data);

          sql(
            `UPDATE repositories SET name = ${escape(data.name)}, icon = ${escape(data.icon)} WHERE id = ${escape(
              params.id
            )}`
          ).then(() => {
            setData(data);
          });
        });
      });
    }
  }, [repository, params.id]);

  const installApp = async (dapp: any) => {
    try {
      setSpinners((prevState) => ({
        ...prevState,
        [dapp.name]: true,
      }));
      await downloadAndInstallMDSFile(dapp.file.replace('http://', 'https://'));
      await getMds();
    } catch {
      setErrorResponseModal('Unable to install MiniDapp, please try again later...');
    } finally {
      setSpinners((prevState) => ({
        ...prevState,
        [dapp.name]: false,
      }));
    }
  };

  const updateApp = async (dapp: any, uid: string) => {
    try {
      setSpinners((prevState) => ({
        ...prevState,
        [dapp.name]: true,
      }));
      await downloadAndUpdateMDSFile(dapp.file, uid);
      await getMds();
    } catch {
      setErrorResponseModal('Unable to update MiniDapp, please try again later...');
    } finally {
      setSpinners((prevState) => ({
        ...prevState,
        [dapp.name]: false,
      }));
    }
  };

  const triggerDownload = (evt, app) => {
    evt.preventDefault();
    const el = document.createElement('a');
    el.href = app.file;
    el.download = '';
    el.click();
  };

  // works out if update is available based on the installed version and the version in the repo
  const repositoryVersion = repositoryApp && Number(repositoryApp.version.split('.').join(''));
  const installedVersion = installedApp ? Number(installedApp.conf.version.split('.').join('')) : false;
  const updateAvailable = installedVersion ? repositoryVersion > installedVersion : false;

  return (
    <div className="relative app text-white">
      <div>
        <Modal display={!!errorResponseModal} frosted={true}>
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-red-950 bg-opacity-10 text-status-red font-bold rounded text-sm border border-status-red mb-2">
              {errorResponseModal}
            </div>
            <Button onClick={() => setErrorResponseModal(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        </Modal>
        <TitleBarBack
          label="Close"
          overrideBack={() => (
            <svg
              className="-mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="mask0_550_6785" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_550_6785)">
                <path
                  d="M6.39953 18.6534L5.3457 17.5995L10.9457 11.9995L5.3457 6.39953L6.39953 5.3457L11.9995 10.9457L17.5995 5.3457L18.6534 6.39953L13.0534 11.9995L18.6534 17.5995L17.5995 18.6534L11.9995 13.0534L6.39953 18.6534Z"
                  fill="#F9F9FA"
                />
              </g>
            </svg>
          )}
        />
        <div className="relative pt-8 p-6 flex flex-col gap-4 max-w-xl mx-auto mb-24">
          {repositoryApp && (
            <div>
              <div
                className="w-[66px] h-[64px] min-w-[64px] text-center rounded bg-contain mb-8"
                style={{
                  backgroundImage: `url('${repositoryApp.icon}')`,
                }}
              />

              <h1 className="text-3xl mb-3">{repositoryApp.name}</h1>
              <p className="mb-4">{repositoryApp.description}</p>
              <p className="mb-2 text-core-grey-60">Version: {repositoryApp.version}</p>
              <p className="text-core-grey-60 mb-8">Updated: {repositoryApp.date}</p>

              <div className="min-h-[48px] h-full mb-5">
                {!appIsInWriteMode && (
                  <button
                    onClick={(evt) => triggerDownload(evt, repositoryApp)}
                    className={`active:scale-95 transition min-w-[100px] bg-core-grey-20 mx-auto text-sm text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}
                  >
                    Download
                  </button>
                )}
                {appIsInWriteMode && (
                  <>
                    {spinners[repositoryApp.name] && (
                      <div className="flex items-center pl-8 relative overflow-hidden">
                        <div role="status" className="min-w-[60px] max-h-[28px]">
                          <svg
                            aria-hidden="true"
                            className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                    {!spinners[repositoryApp.name] && !installedApp && (
                      <button
                        onClick={(evt) => {
                          evt.preventDefault();
                          installApp(repositoryApp);
                        }}
                        className={`active:scale-95 transition min-w-[100px] bg-core-grey-20 mx-auto text-sm text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}
                      >
                        Install
                      </button>
                    )}
                    {installedApp && !updateAvailable && (
                      <button
                        disabled={true}
                        className={`transition border border-gray-300 text-gray-200 mx-auto text-sm text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}
                      >
                        Installed
                      </button>
                    )}
                    {!spinners[repositoryApp.name] && installedApp && updateAvailable && (
                      <button
                        onClick={(evt) => {
                          evt.preventDefault();
                          updateApp(repositoryApp, installedApp.uid);
                        }}
                        className={`active:scale-95 transition min-w-[100px] bg-core-grey-20 mx-auto text-sm text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}
                      >
                        Update
                      </button>
                    )}
                  </>
                )}
              </div>

              {repositoryApp.about && (
                <div>
                  <h5 className="mb-3">About</h5>
                  <div className="text-core-grey-60 mb-3" style={{ whiteSpace: 'pre-line' }}>
                    {Array.isArray(repositoryApp.about) &&
                      repositoryApp.about.map((row, index) => <div key={row + index}>{row}</div>)}
                    {typeof repositoryApp.about === 'string' && repositoryApp.about}
                  </div>
                </div>
              )}

              {repositoryApp.repository_url && (
                <div className="mt-8">
                  <div className="my-6 bg-core-black-contrast-3 h-[2px] w-full" />
                  <h5 className="mb-3">Repository URL</h5>
                  <div className="text-core-grey-60 mb-3">
                    <a className="underline" href={repositoryApp.repository_url}>
                      {repositoryApp.repository_url}
                    </a>
                  </div>
                </div>
              )}

              {repositoryApp.release_notes && (
                <div className="mt-8">
                  <div className="my-6 bg-core-black-contrast-3 h-[2px] w-full" />
                  <h5 className="mb-3">Release Notes</h5>
                  <div className="text-core-grey-60 mb-3">
                    <ReactMarkdown>{repositoryApp.release_notes}</ReactMarkdown>
                  </div>
                </div>
              )}

              {Array.isArray(repositoryApp.history) && repositoryApp.history.length > 0 && (
                <div>
                  <div className="my-6 bg-core-black-contrast-3 h-[2px] w-full" />
                  <h5 className="text-core-grey-5 mb-4">Version history</h5>
                  {repositoryApp.history.map((app, index) => (
                    <div key={app.name + index} className="mb-4">
                      <a href={app.file} download className="mb-0.5 underline">
                        {app.version}
                      </a>
                      <div className="text-core-grey-60">{app.update}</div>
                      {app.release_notes && (
                        <div className="text-core-grey-60 mt-2">
                          <ReactMarkdown>{app.release_notes}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(repositoryApp.update) && repositoryApp.update.length > 0 && (
                <div>
                  <div className="my-6 bg-core-black-contrast-3 h-[2px] w-full" />
                  <h5 className="flex items-center mb-6">
                    Updates
                    <svg
                      onClick={() => setShowUpdates((prevState) => !prevState)}
                      className={`cursor-pointer ml-1 transition-all ${showUpdates ? '' : 'rotate-180'}`}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="mask0_550_7138" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                        <rect width="32" height="32" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_550_7138)">
                        <path
                          d="M16.0004 20.0668L8.4668 12.5004L9.6668 11.334L16.0004 17.6668L22.334 11.334L23.534 12.534L16.0004 20.0668Z"
                          fill="#F9F9FA"
                        />
                      </g>
                    </svg>
                  </h5>
                  {showUpdates && (
                    <div>
                      {repositoryApp.update.map((row, index) => (
                        <div key={row + index}>{row}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppPage;
