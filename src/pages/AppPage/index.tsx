import TitleBarBack from '../../components/TitleBarBack';

function AppPage() {
  return (
    <div className="relative app text-white">
      <div>
        <TitleBarBack
          label="Close"
          overrideBack={() => (
            <svg className="-mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="relative pt-8 p-6 flex flex-col gap-4 max-w-xl mx-auto">
          <svg className="mb-4" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_550_6788)">
              <rect width="72" height="72" fill="#464C4F"/>
            </g>
            <defs>
              <clipPath id="clip0_550_6788">
                <rect width="72" height="72" rx="8" fill="white"/>
              </clipPath>
            </defs>
          </svg>

          <div>
            <h1 className="text-3xl mb-2">MiniDapp name</h1>
            <p className="mb-2">Social media and messaging over Maxima</p>
            <p className="text-core-grey-60">Updated: May 03, 2023</p>

            <div className="py-8">
              <button className={`active:scale-95 transition bg-core-grey-20 text-sm text-center w-fit rounded text-black px-8 py-2 rounded-full`}>
                Install
              </button>
            </div>

            <h5 className="mb-3">About</h5>
            <p className="text-core-grey-60 mb-3">Lorem ipsum dolor sit amet consectetur. Lectus ultricies sagittis lectus lobortis nunc adipiscing a ipsum vitae. Sed suspendisse morbi eu diam. Viverra laoreet eget tellus ipsum ut. Dignissim massa egestas mi turpis duis ornare eu hendrerit. Vel integer egestas </p>
            <p className="text-core-grey-5">Read more</p>

            <div className="my-6 bg-core-black-contrast-3 h-[2px] w-full" />

            <h5 className="text-core-grey-5 mb-4">Version history</h5>

            <div className="mb-0.5">1.0.0</div>
            <div className="text-core-grey-60">Released 17th of March 2023</div>

            <div className="my-6 bg-core-black-contrast-3 h-[2px] w-full" />

            <h5 className="flex items-center">Updates
              <svg className="ml-1" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_550_7138" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                  <rect width="32" height="32" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_550_7138)">
                  <path d="M16.0004 20.0668L8.4668 12.5004L9.6668 11.334L16.0004 17.6668L22.334 11.334L23.534 12.534L16.0004 20.0668Z" fill="#F9F9FA"/>
                </g>
              </svg>
            </h5>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AppPage;
