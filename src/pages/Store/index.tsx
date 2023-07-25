import TitleBarBack from '../../components/TitleBarBack';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import official from '../../utilities/official_dapps.json';
import pandaStore from '../../panda_dapps.json';

function Store() {
  const [data, setData] = useState(null);
  const { repositories } = useContext(appContext);
  const params = useParams();
  const repository = repositories.find(i => i.ID === params.id);

  useEffect(() => {
    if (repository && !data) {
      if (params.id === '1') {
        setData(official);
      }
      if (params.id === '2') {
        setData(pandaStore);
      }
    }
  }, repository);

  return (
    <div className="relative app text-white overflow-hidden inline-grid">
      <div className="overflow-hidden">
        <TitleBarBack label="Back">
          <div className="hidden cursor-pointer active:scale-90 absolute right-0 relative w-[36px] h-[36px] rounded-full bg-core-black-contrast-2 flex items-center justify-center">
            <svg
              className="mr-1"
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9082 18.5C13.1883 18.5 12.576 18.2532 12.0713 17.7596C11.5666 17.266 11.3143 16.6667 11.3143 15.9615C11.3143 15.8463 11.3237 15.727 11.3424 15.6035C11.3611 15.4801 11.3893 15.3663 11.4267 15.2621L4.45317 11.2645C4.20416 11.5071 3.9207 11.6967 3.60279 11.8334C3.28487 11.9701 2.94822 12.0384 2.59284 12.0384C1.87261 12.0384 1.26041 11.7917 0.756244 11.2984C0.252081 10.805 0 10.2059 0 9.50103C0 8.7962 0.252081 8.19674 0.756244 7.70266C1.26041 7.20859 1.87261 6.96155 2.59284 6.96155C2.94822 6.96155 3.28487 7.02989 3.60279 7.16656C3.9207 7.30326 4.20416 7.4929 4.45317 7.7355L11.4267 3.73786C11.3893 3.63372 11.3611 3.51992 11.3424 3.39646C11.3237 3.27301 11.3143 3.15367 11.3143 3.03844C11.3143 2.33332 11.5663 1.73396 12.0703 1.24038C12.5742 0.746793 13.1862 0.5 13.9061 0.5C14.626 0.5 15.2383 0.746693 15.743 1.24008C16.2477 1.73346 16.5 2.33257 16.5 3.0374C16.5 3.74224 16.2479 4.34169 15.7438 4.83577C15.2396 5.32984 14.6274 5.57688 13.9072 5.57688C13.5518 5.57688 13.2151 5.50855 12.8972 5.37187C12.5793 5.23518 12.2958 5.04553 12.0468 4.80293L5.07327 8.80057C5.11075 8.90471 5.13885 9.0183 5.15758 9.14135C5.17632 9.26438 5.18568 9.38331 5.18568 9.49814C5.18568 9.61299 5.17632 9.73254 5.15758 9.85681C5.13885 9.98107 5.11075 10.0953 5.07327 10.1994L12.0468 14.197C12.2958 13.9544 12.5793 13.7648 12.8972 13.6281C13.2151 13.4914 13.5518 13.4231 13.9072 13.4231C14.6274 13.4231 15.2396 13.6698 15.7438 14.1632C16.2479 14.6566 16.5 15.2557 16.5 15.9605C16.5 16.6653 16.248 17.2648 15.7441 17.7589C15.2401 18.2529 14.6282 18.5 13.9082 18.5ZM13.9072 4.19229C14.2347 4.19229 14.5131 4.08016 14.7422 3.8559C14.9712 3.63162 15.0858 3.35913 15.0858 3.03842C15.0858 2.71771 14.9712 2.44522 14.7422 2.22094C14.5131 1.9967 14.2347 1.88457 13.9072 1.88457C13.5796 1.88457 13.3012 1.9967 13.0722 2.22096C12.8431 2.44524 12.7286 2.71773 12.7286 3.03844C12.7286 3.35915 12.8431 3.63164 13.0722 3.85592C13.3012 4.08018 13.5796 4.19229 13.9072 4.19229ZM2.59284 10.6538C2.92042 10.6538 3.19875 10.5417 3.42784 10.3174C3.65691 10.0932 3.77144 9.82067 3.77144 9.49997C3.77144 9.17926 3.65691 8.90677 3.42784 8.68249C3.19875 8.45824 2.92042 8.34612 2.59284 8.34612C2.26526 8.34612 1.98693 8.45825 1.75784 8.68251C1.52878 8.90679 1.41424 9.17928 1.41424 9.49999C1.41424 9.8207 1.52878 10.0932 1.75784 10.3175C1.98693 10.5417 2.26526 10.6538 2.59284 10.6538ZM13.9072 17.1154C14.2347 17.1154 14.5131 17.0033 14.7422 16.779C14.9712 16.5547 15.0858 16.2822 15.0858 15.9615C15.0858 15.6408 14.9712 15.3683 14.7422 15.144C14.5131 14.9198 14.2347 14.8077 13.9072 14.8077C13.5796 14.8077 13.3012 14.9198 13.0722 15.1441C12.8431 15.3683 12.7286 15.6408 12.7286 15.9615C12.7286 16.2822 12.8431 16.5547 13.0722 16.779C13.3012 17.0033 13.5796 17.1154 13.9072 17.1154Z"
                fill="#A7A7B0"
              />
            </svg>
          </div>
          {params.id !== '1' && (
            <div className="cursor-pointer active:scale-90 absolute right-0 relative w-[36px] h-[36px] rounded-full bg-core-black-contrast-2 flex items-center justify-center">
              <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.30771 18.5C2.80899 18.5 2.38303 18.3117 2.02983 17.9352C1.67661 17.5586 1.5 17.1045 1.5 16.5729V3.04211H0.5V1.44304H4.99999V0.5H11V1.44304H15.5V3.04211H14.5V16.5729C14.5 17.1114 14.325 17.5672 13.975 17.9403C13.625 18.3134 13.1974 18.5 12.6923 18.5H3.30771ZM13 3.04211H2.99998V16.5729C2.99998 16.6686 3.02883 16.7472 3.08653 16.8087C3.14423 16.8702 3.21796 16.9009 3.30771 16.9009H12.6923C12.7692 16.9009 12.8397 16.8668 12.9039 16.7984C12.968 16.7301 13 16.6549 13 16.5729V3.04211ZM5.40387 14.7688H6.90385V5.17424H5.40387V14.7688ZM9.09615 14.7688H10.5961V5.17424H9.09615V14.7688Z"
                  fill="#A7A7B0"
                />
              </svg>
            </div>
          )}
        </TitleBarBack>
        <div className="relative pt-2 p-4 flex flex-col gap-4 max-w-xl mx-auto">
          <div className="h-[140px] w-full bg-[#0595E7] rounded relative flex">
            <div className="hidden absolute bottom-0 p-3 left-0 right-0 flex justify-center gap-2 mx-auto">
              <div className="node w-[8px] h-[8px] bg-white rounded-full" />
              <div className="node w-[8px] h-[8px] bg-core-grey-80 rounded-full" />
              <div className="node w-[8px] h-[8px] bg-core-grey-80 rounded-full" />
            </div>
          </div>
          {data && (
            <div className="bg-core-black-contrast-2 rounded p-4">
              <h5 className="pb-3 -mt-0.5">About</h5>
              <p className="text-sm text-core-grey-20">
                {data.description}
              </p>
              {/*<p className="text-xs">Read more</p>*/}
            </div>
          )}

          {/*<div className="cursor-pointer text-right text-primary flex gap-3 items-center justify-end">*/}
          {/*  Install all*/}
          {/*  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <path*/}
          {/*      d="M2.3077 15.9997C1.80257 15.9997 1.375 15.8247 1.025 15.4747C0.675 15.1247 0.5 14.6971 0.5 14.192V11.4997H1.99997V14.192C1.99997 14.2689 2.03202 14.3394 2.09612 14.4036C2.16024 14.4677 2.23077 14.4997 2.3077 14.4997H13.6922C13.7692 14.4997 13.8397 14.4677 13.9038 14.4036C13.9679 14.3394 14 14.2689 14 14.192V11.4997H15.5V14.192C15.5 14.6971 15.325 15.1247 14.975 15.4747C14.625 15.8247 14.1974 15.9997 13.6922 15.9997H2.3077ZM7.99997 12.1151L3.7308 7.84588L4.78462 6.76131L7.25 9.22668V0.82666H8.74995V9.22668L11.2153 6.76131L12.2691 7.84588L7.99997 12.1151Z"*/}
          {/*      fill="#31CEFF"*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*</div>*/}

          <div className="flex-grow lg:px-0 flex flex-col gap-2">
            {data && data.dapps.map((app) => (
              <Link to="/app">
                <div className="bg-core-black-contrast-2 rounded flex justify-start items-left h-full">
                  <div
                    className="w-[66px] h-[64px] min-w-[64px] rounded bg-cover"
                    style={{
                      backgroundImage: `url('${app.icon}')`,
                    }}
                  />
                  <p className="flex-grow flex items-center px-4 truncate overflow-hidden min-w-[0]">
                    <div className="overflow-hidden truncate">
                      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {app.name}
                      </div>
                      <p className="text-xs text-core-grey-80 truncate overflow-hidden">{app.version}</p>
                    </div>
                  </p>
                  <div className="pr-4 flex items-center justify-end">
                    <button
                      onClick={(evt) => {
                        evt.preventDefault();
                      }}
                      className={`active:scale-95 transition bg-core-grey-20 mx-auto text-sm text-center w-fit rounded text-black px-5 py-1.5 rounded-full`}
                    >
                      Install
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
