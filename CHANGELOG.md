# Changelog

All notable changes to this project are documented here. The format is based on
[keep a changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.9] - 2025-09-04

#### Changed

- Refactored some types for better DX

## [1.0.8] - 2025-08-30

#### Added

- Included `LOCAL_SETUP.md` and `EXAMPLES.md` to link out additional documentation.
- Added `@rollup/plugin-terser` as a dev dependency for minification.
- Added command to generate tar file with latest build

#### Changed

- Renamed `useBeacon.ts` to `useValue.ts`
- Removed generation of sourcemaps

## [1.0.7] - 2025-08-30

#### Added

- Include `CHANGELOG.md` as part of Github push, exclude from npm push.
- Added support for silent state updates via `options.silent` for setter, and support for firing a
  state update event directly via `options.fireImmediately` during subscription.
- Separated type definitions into `StoreSetOptions` and `StoreSubscriptionOptions`

#### Changes

- Renamed hook `useBeacon` to `useValue`

## [1.0.6] - 2025-08-27

#### Changed

- Renamed library to `react-orba`
- Modify README.md
- 🟡 **TODO**: Rename `useBeacon` and it's implementations.

## [1.0.5] - 2025-08-26 [open-sourced]

#### Added

- Added .npmignore

## [1.0.4] - 2025-07-14

#### Added

- Prettier for linting

#### Changed

- Prepare command `"prepare": "npx prettier . --write && npm run build",` now formats before build.
- Fixed issue with `useBeacon` that would break for non-primitive types.

## [1.0.3] - 2025-06-10

#### Added

- Helper function `mapSelectedStateToGlobalState<T, U>` added to map updated state slices with
  global state.

#### Changed

- `useBeacon` uses a state setter to merge updated states along with `unstable_batchedUpdates`.
- 🔴 **VERSION DEPENDENCY**: React 18+

## [1.0.2] - 2025-05-28

#### Added

- Hook now uses `useSyncExternalStore` for batched updates.

#### Changed

- `useGlobalState` renamed to `useBeacon`
- `useBeacon` returns a tuple, with current state and updater function.

## [1.0.1] - 2025-04-19

#### Added

- README.md added along with basic usage for primitives.
- 🟡 **TODO**: README requires detailed examples, along with usage of complex data types.

## [1.0.0] - 2025-01-22

#### Added

- Initial release with core pub-sub and minimal TypeScript types.
