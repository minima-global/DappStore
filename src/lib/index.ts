export function promisify(fn: any, command: string, arg: any = undefined): any {
  return new Promise((resolve) => {
    if (arg) {
      fn(command, arg, function (response: any) {

        if (response.status) {
          return resolve(response);
        }

        return resolve(null);
      });
    } else {
      fn(command, function (response: any) {
        if (response.status) {
          return resolve(response);
        }

        return resolve(null);
      });
    }
  });
}

export function set(key: string, value: string) {
  return promisify(MDS.keypair.set, key, value);
}

export function get(key: string) {
  return promisify(MDS.keypair.get, key);
}

export function sql(query: string) {
  return promisify(MDS.sql, query);
}

export function dAppLink(dAppName: string): any {
  return promisify(MDS.dapplink, dAppName);
}

export function deleteFileFromWeb(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.file.copytoweb(filePath, `/mywebfiles/${filePath.split('/').pop()}`, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function getFullFilePath(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.file.getpath(filePath, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function installMiniDapp(filePath: string, trust: 'write' | 'read' = 'read'): Promise<string> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.cmd(`mds action:install file:${filePath} trust:${trust}`, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function updateMiniDapp(filePath: string, uid: string, trust: 'write' | 'read' = 'read'): Promise<string> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.cmd(`mds action:update uid:${uid} file:${filePath} trust:${trust}`, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}


export function downloadFile(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.download(url, function (resp: any) {
      if (resp.status) {
        resolve(resp.response);
      }

      return reject();
    });
  });
}

export function isWriteMode(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`checkmode`, function (response: any) {
      if (response.status) {
        return resolve(response.response.mode === 'WRITE');
      }

      return reject();
    });
  });
}

export function mds(): any {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('mds', function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function loadBinary(filename) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.loadbinary(filename, function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function hexToBase64(hexStr: string) {
  return JSON.parse(atob(MDS.util.hexToBase64(hexStr)));
}
