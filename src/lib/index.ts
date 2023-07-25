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
