// debug to reset to check if notifications are being triggered
var DEBUG = false;

// Ticker for timer execution
var ticker = 0;
var sent = false;

function getInstalledApps(callback) {
  MDS.cmd(`mds`, function (resp) {
    callback(resp.response.minidapps);
  });
}

function compareSemver(v1, v2) {
  let [major1, minor1, patch1] = String(v1).split('.').map(Number);
  let [major2, minor2, patch2] = String(v2).split('.').map(Number);

  if (!major1) major1 = 0;
  if (!minor1) minor1 = 0;
  if (!patch1) patch1 = 0;
  if (!major2) major2 = 0;
  if (!minor2) minor2 = 0;
  if (!patch2) patch2 = 0;

  if (major1 !== major2) {
    return major1 > major2 ? false : true;
  }
  if (minor1 !== minor2) {
    return minor1 > minor2 ? false : true;
  }
  if (patch1 !== patch2) {
    return patch1 > patch2 ? false : true;
  }

  return false;
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
  // if notification was sent, do not send until flag is false again
  if (sent) {
    return;
  }

  if (DEBUG) {
    MDS.log('checking!');
  }

  // !) before any of the below gets executed, we check if the user has enabled notifications
  // 1) get a list of installed midapps
  // 2) get all repos that have been added to the minidapp + the minima dapp json
  // 3) iterate through repos to retrieve the json from the URL
  // 4) iterate through each minidapp and ensure that they are installed and do a semver check
  // 5) based on results, action if notification should be sent
  MDS.keypair.get('notifications_enabled', function (msg) {
    if (DEBUG) {
      MDS.log('> inside!');
    }

    if (msg.value === '1') {
      if (DEBUG) {
        MDS.log('> enabled!');
      }

      getInstalledApps(function (installedApps) {
        getUrls(function (jsonUrls) {
          for (var repo of jsonUrls) {
            MDS.net.GET(repo, function (resp) {
              try {
                // ensure json is a minidapp repo
                if (resp && resp.response) {
                  var json = JSON.parse(resp.response);
                  var hasUpdates = 0;

                  for (var minidapp of json.dapps) {
                    try {
                      var name = minidapp.name;
                      var version = minidapp.version;
                      var installed = installedApps.find((i) => i.conf.name.toLowerCase() === name.toLowerCase());

                      if (installed) {
                        var result = compareSemver(installed.conf.version, version);

                        if (result) {
                          hasUpdates += 1;
                        }
                      }
                    } catch (err) {
                      // do nothing if it fails
                    }
                  }

                  if (hasUpdates) {
                    if (DEBUG) {
                      MDS.log('> updates available');
                    }

                    MDS.notify('New MiniDapps are available! Tap to open the Dapp Store.');
                    sent = true;
                  }

                  if (!hasUpdates && DEBUG) {
                    MDS.log('All MiniDapps are up to date!');
                  }
                }
              } catch (err) {
                MDS.log('There was an error fetching the repo: ' + repo);
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
    MDS.sql('CREATE TABLE IF NOT EXISTS `repositories` (`id` bigint auto_increment, `name` varchar(512) NOT NULL, `url` varchar(2048) NOT NULL, `icon` varchar(2048), `created_at` TIMESTAMP)', function () {
      MDS.cmd(`checkmode`, function (response) {
        if (response.status && response.response.mode === 'WRITE') {
          MDS.keypair.get('notifications_enabled', function (msg) {
            if (!msg.value) {
              // by default enable notifications
              MDS.keypair.set('notifications_enabled', '1');

              main();
            }

            if (msg.value === '1') {
              main();
            }
          });
        }
      });
    })
  } else if (msg.event === 'MDS_TIMER_1HOUR') {
    ticker = ticker + 1;

    if (!sent) {
      MDS.cmd(`checkmode`, function (response) {
        if (response.status && response.response.mode === 'WRITE') {
          main();
        }
      });
    }

    if (ticker >= 24) {
      sent = false;
      ticker = 0;
    }
  }
});
