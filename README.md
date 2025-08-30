# react-orba

A simple, lightweight state management library for React applications. Works over the pub-sub model
and batches state updates.

## Usage

1. At the root of your app or a module, create a store.

```tsx
import { createStore } from 'react-orba';

interface AppState {
  theme: string;
  userContext: {
    userId: string | undefined;
    authTimeout: number;
  };
}

const initialParams: AppState = {
  theme: 'light',
  userContext: {
    userId: undefined,
    authTimeout: 3600,
  },
};

const appStore = createStore<AppState>(initialParams);
```

2. In your component, slice out your state variable(s) using the `useBeacon` hook.

```tsx
import { appStore } from '../App';

const [theme, setTheme] = useBeacon(appStore, (state) => state.theme);
```

3. Update state as needed - similar how you would use the `useState` hook!

```tsx
<button onClick={() => setTheme('light')}>Toggle theme</button>
```

## Running on local

1. Clone the repo

```
git clone https://github.com/yatish1606/react-orba.git && cd react-orba
```

2. Install dependencies

```
npm install
```

> [!WARNING]  
> Use the command `npm i --resolve` for incompatible React versions.

2. Add your changes / modifications or debug points and run on local

```
npm run dev
```
