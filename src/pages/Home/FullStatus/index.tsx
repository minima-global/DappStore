import { useContext } from 'react';
import { appContext } from '../../../AppContext';
import Back from '../../../components/UI/Back';
import Panel from '../../../components/UI/Panel';
import SlideScreen from '../../../components/UI/SlideScreen';

type FullStatusProps = {
  display: boolean;
  dismiss: () => void;
};

function FullStatus({ display, dismiss }: FullStatusProps) {
  const { statusData } = useContext(appContext);

  return (
    <SlideScreen display={display}>
      <div className="h-full flex flex-col p-5">
        {statusData && (
          <>
            <Back textContent="Health" onClick={dismiss} />
            <h1 className="text-2xl mb-6">Full node status</h1>
            <div className="flex-grow flex flex-col gap-2">
              <Panel title="Minima Status" value={JSON.stringify(statusData, null, 2)} copy>
                <textarea className="pr-5 text-sm flex-grow bg-transparent resize-none w-full custom-scrollbar" rows={20} value={JSON.stringify(statusData, null, 2)} readOnly />
              </Panel>
            </div>
          </>
        )}
      </div>
    </SlideScreen>
  );
}

export default FullStatus;
