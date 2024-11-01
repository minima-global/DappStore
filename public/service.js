// debug to reset to check if notifications are being triggered
var DEBUG = false;

// Ticker for timer execution
var ticker = 0;

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

function main() {
  // !) before any of the below gets executed, we check if the user has enabled notifications
  // 1) get a list of installed midapps
  // 2) get all repos that have been added to the minidapp + the minima dapp json
  // 3) iterate through repos to retrieve the json from the URL
  // 4) iterate through each minidapp and ensure that they are installed and do a semver check
  // 5) based on results, action if notification should be sent
  MDS.keypair.get('notifications_enabled', function (msg) {
    if (msg.value === '1') {
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
                        // get the last version that was notified to the user
                        // a) send notification if a version was never sent
                        // b) if last notification was the same version, do not resend notification
                        if (!DEBUG) {
                          MDS.keypair.get('notification_' + name, function (msg) {
                            var notificationLastSent = msg.value;

                            if (notificationLastSent !== version) {
                              MDS.notify('There is a new version of ' + name + ' available! (' + version + ')');
                              MDS.keypair.set('notification_' + name, version);
                            }
                          });
                        }

                        // setting DEBUG to true will clear the previous set version for this current minidapp so that it can re-trigger
                        // the notification. This can be used to test if notifications are being triggered correctly instead
                        // of having to delete and reinstall the app to clear keypair items
                        if (DEBUG) {
                          MDS.keypair.set('notification_' + name, '', function (msg) {
                            MDS.log('reset!');
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
  });
}

MDS.init(function (msg) {
  if (msg.event === 'inited') {
    MDS.keypair.get('notifications_enabled', function (msg) {
      if (!msg.value) {
        main();
        MDS.keypair.set('notifications_enabled', '1');
      }

      if (msg.value === '1') {
        main();
      }
    });
  } else if (msg.event === 'MDS_TIMER_1HOUR') {
    ticker = ticker + 1;

    if (ticker >= 3) {
      main();
      ticker = 0;
    }
  }
});
