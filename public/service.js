// debug to reset to check if notifications are being triggered
var CLEAR = false;

function getInstalledApps(callback) {
  MDS.cmd(`mds`, function (resp) {
    callback(resp.response.minidapps);
  });
}

function compareSemver(v1, v2) {
  const [major1, minor1, patch1] = String(v1).split('.').map(Number);
  const [major2, minor2, patch2] = String(v2).split('.').map(Number);

  if (major1 !== major2) {
    return major1 > major2 ? 1 : -1;
  }
  if (minor1 !== minor2) {
    return minor1 > minor2 ? 1 : -1;
  }
  if (patch1 !== patch2) {
    return patch1 > patch2 ? 1 : -1;
  }

  return 0;
}

function getUrls(callback) {
  const urls = [];

  MDS.sql(`SELECT * FROM repositories`, function (resp) {
    resp.rows.forEach(function (row) {
      if (row.URL) {
        urls.push(row.URL);
      }
    });

    callback(urls);
  });
}

MDS.init(function (msg) {
  var ticker = 0;

  if (msg.event === 'inited') {
    // do nothing
  } else if (msg.event === 'MDS_TIMER_1HOUR') {
    ticker = ticker + 1;

    if (ticker >= 3) {
      getInstalledApps(function (installedApps) {
        getUrls(function (jsonUrls) {
          for (var repo of jsonUrls) {
            MDS.net.GET(repo, function (resp) {
              // ensure json is a minidapp repo
              if (resp && resp.response) {
                const json = JSON.parse(resp.response);

                for (var minidapp of json.dapps) {
                  try {
                    var name = minidapp.name;
                    var version = minidapp.version;
                    var installed = installedApps.find((i) => i.conf.name === name);

                    if (installed) {
                      var result = compareSemver(installed.conf.version, version);

                      if (result) {
                        // clear will delete the previously set version for the minidapp so that it will re-trigger
                        // the notification. This is used to test if notifications are being triggered correctly instead
                        // of having to reinstall the app
                        if (!clear) {
                          // get the last version that was notified to the user
                          // a) send notification if a version was never sent
                          // b) if last notification was the same version, do not resend notification
                          MDS.keypair.get('notification_' + name, function (msg) {
                            var notificationLastSent = msg.value;

                            if (notificationLastSent !== version) {
                              MDS.notify('There is a new version of ' + name + ' available! (' + version + ')');
                              MDS.keypair.set('notification_' + name, version);
                            }
                          });
                        } else {
                          MDS.keypair.set('notification_' + name, '', function (msg) {
                            console.log('reset!');
                            MDS.keypair.get('notification_' + name, function (msg) {
                              var notificationLastSent = msg.value;

                              if (notificationLastSent !== version) {
                                MDS.notify('There is a new version of ' + name + ' available! (' + version + ')');
                                MDS.keypair.set('notification_' + name, version);
                              }
                            });
                          });
                        }
                      }
                    }
                  } catch (err) {
                    // do nothing if it fails
                  }
                }
              }
            });
          }
        });
      });
    }

    if (ticker >= 3) {
      ticker = 0;
    }
  }
});
