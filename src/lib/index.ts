import { MaxContactsResponse, MaximaResponse, MDSResponse, StatusResponse } from '../types';

export function status(): Promise<StatusResponse> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('status', function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxima(): Promise<MaximaResponse> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('maxima', function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContacts(): Promise<MaxContactsResponse> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('maxcontacts action:list', function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function mds(): Promise<MDSResponse> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('mds', function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function promisfy(fn: any, command: string, arg: any = undefined): any {
  return new Promise((resolve) => {
    if (arg) {
      fn(command, arg, function (response: any) {
        if (response.status) {
          return resolve(response.response);
        }

        return resolve(null);
      });
    } else {
      fn(command, function (response: any) {
        if (response.status) {
          return resolve(response.response);
        }

        return resolve(null);
      });
    }
  });
}

export function deleteFile(fileName: string) {
  return promisfy((window as any).MDS.file.delete, fileName);
}

export function loadFile(fileName: string) {
  return promisfy((window as any).MDS.file.load, fileName);
}

export function saveFile(fileName: string, arg: string | object) {
  return promisfy((window as any).MDS.file.save, fileName, arg);
}

export function getBlock() {
  return promisfy((window as any).MDS.cmd, 'block');
}
