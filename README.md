# react-orba

A simple, lightweight state management library for React applications. Works over the pub-sub model
and batches state updates.

## When to use react-orba?

`react-orba` isn’t designed as a drop-in replacement for popular libraries like
[Redux](https://redux.js.org/) or [Zustand](https://github.com/pmndrs/zustand). Instead, it’s best
suited for scenarios with frequent state changes where a lightweight, minimal state management
solution is preferred.

| Feature                     | react-orba                   | redux                           | zustand          |
| --------------------------- | ---------------------------- | ------------------------------- | ---------------- |
| **Bundle Size**             | ✅ Tiny & minimal _(~2.5kb)_ | Boilerplate + toolkit _(~40kb)_ | Small _(~3.5kb)_ |
| **Boilerplate**             | ✅ Low                       | Significant                     | Minimal          |
| **Built-in batching**       | ✅ Yes                       | No                              | No               |
| **Middlewares and plugins** | ⚠️ In roadmap                | ✅ Yes                          | ✅ Yes           |
| **Devtools support**        | ⚠️ In roadmap                | ✅ Yes                          | Limited          |
| **Debugging support**       | No                           | ✅ Excellent                    | Limited          |

## Usage

1. At the root of your app or a module, create a store.

```tsx
import { createStore } from 'react-orba';

const initialParams: AppState = {
  theme: 'light',
  ...
};

const appStore = createStore<AppState>(initialParams);
```

2. In your component, slice out your state variable(s) using the `useValue` hook.

```tsx
const [theme, setTheme] = useValue<AppState, string>(appStore, (state) => state.theme);
```

3. Update state as needed - similar how you would use the `useState` hook!

```tsx
<button onClick={() => setTheme('light')}>Toggle theme</button>
```

## Roadmap

#### Developer Experience and tooling

- [ ] Support for developer tools
- [ ] Logging and debug modes

#### State management

- [x] Support for silent state updates and immediate update firing
- [ ] Support for async state updates
- [ ] Support for persistence layer - integration with IndexedDB or browser storages
- [ ] Custom equality function for state slices
- [ ] Memoized `useValue` hook

#### Documentation and hygiene

- [ ] Example usages for complex patters
- [ ] Migrating from Zustand
- [ ] Fix persistent linting issues

## Resources

- [Changelog](https://github.com/yatish1606/react-orba/blob/main/CHANGELOG.md)
- [Run project locally](https://github.com/yatish1606/react-orba/blob/main/LOCAL_SETUP.md)
- [Usage examples](https://github.com/yatish1606/react-orba/blob/main/EXAMPLES.md)
