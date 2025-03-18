# Changelog

## [1.5.1] - 18 March 25

- The Minima MiniDapp banner is now hidden if the Minima MiniDapp store is not reachable

## [1.5.0] - 18 March 25

- The default Minima MiniDapp stores are no longer automatically added
- A online check is performed to check if a valid response is returned when adding a MiniDapp Store

## [1.4.2] - 24 February 25

- Minor text update to the warning message about installing a bundle of MiniDapps

## [1.4.1] - 21 February 25

- Notifications for available and updatable MiniDapps are now only sent once per version (and must be higher than the previously notified version)

## [1.4.0] - 20 February 25

- Added the ability to install a bundle of MiniDapps if a MiniDapp requires additional MiniDapps as dependencies

## [1.3.1] - 19 February 25

- Add the names of the MiniDapps that have updates available to the notification message

## [1.3.0] - 13 February 25

- The notification now includes the number of updates available for each store

## [1.2.3] - 20 January 25

- Log error if an error occurs when fetching the repo in service.js

## [1.2.2] - 20 January 25

- Invalid syntax in service.js

## [1.2.1] - 20 January 25

- JSON parsing is now wrapped in a try/catch to prevent errors from breaking the app

## [1.2.0] - 17 January 25

- Added a new default store for beta test dapps

## [1.1.11] - 16 January 25

- fixed an issue where the add a store button was visible when there was already MiniDapp stores

## [1.1.10] - 15 November 24

- added community dapps repo as a default repository

## [1.1.9] - 14 November 24

- fixed issue where the store home screen was flashing on startup

## [1.1.8] - 12 November 24

- moved sql db creation to service.js

## [1.1.7] - 12 November 24

- debug mode disabled by default

## [1.1.6] - 12 November 24

- service.js app update checks are now case insensitive

## [1.1.5] - 12 November 24

- Additional tweaks to the warning message about installing apps in read mode when opening the third party store for the first time

##### [1.1.4] - 12 November 24

- Added a warning message about installing apps in read mode when opening the third party store for the first time

##### [1.1.3] - 07 November 24

- Fixed issue with revised semver checker breaking read mode

##### [1.1.2] - 07 November 24

- Notification that there are MiniDapp updates are now only sent once every 24 hours
- Logic for displaying the terms of use has been revised

##### [1.1.1] - 04 November 24

- tweaks to the logic to how the terms of use is displayed

##### [1.1.0] - 01 November 24

- added notifications when MiniDapp updates are available- there is a settings modal where the MiniDapp update available notification option can be disabled

##### [1.0.9] - 31 October 24

- added terms of use to the splash screen

##### [1.0.8] - 12 September 23

- update mds.js

##### [1.0.6] - 09 August 23

- You can now share Dapp stores that have been added

##### [1.0.5] - 08 August 23

- Minor text changes

##### [1.0.0] - 03 August 23

- Updated "App is in read mode" text content

##### [0.3.6] - 02 August 23

- Updated "App is in read mode" text content
- Fixed issue where MiniDapp store json data was not being updated correctly
- Added app page view

##### [0.3.3] - 01 August 23

- Added example MiniDapp json
- MiniDapp JSON is now loaded using the Minima node instead of being fetched client-side

##### [0.1.1] - 26 July 23

- Initial release
