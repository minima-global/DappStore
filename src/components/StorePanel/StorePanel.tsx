import { useEffect, useState } from 'react';
import { downloadFile, hexToBase64, loadBinary } from '../../lib';

function StorePanel({ repository }) {
  const [data, setData] = useState<Record<string, string>>({});

  /**
   * This may have to be reworked if the store json file is the same name
   * and store panel loads multiple stores at the same time and the files
   * get overwritten. e.g. if store.json (a) and store.json (b) are downloaded
   * at the same time. The way to get around this at the moment is to give
   * the json file a unique name e.g. store_a.json and store_b.json
   */
  useEffect(() => {
    downloadFile(repository.URL).then(function (response: any) {
      loadBinary(response.download.file).then(function (response: any) {
        const data = hexToBase64(response.load.data);
        setData(data);
      });
    });
  }, []);

  return (
    <div className="bg-core-black-contrast-2 rounded overflow-hidden flex items-stretch justify-start h-full">
      <div
        className="w-[64px] min-w-[64px] rounded bg-cover"
        style={{
          backgroundImage: `url('${repository.ICON}'), url('./assets/app.png')`,
        }}
      />
      <div className="bg-core-black-contrast-2 grow p-3 px-4 w-full overflow-hidden">
        <h5 className="font-bold mb-0.5">{repository.NAME}</h5>
        <p className="text-xs text-core-grey-80 text-ellipsis truncate">{data.description}</p>
      </div>
    </div>
  );
}

export default StorePanel;
