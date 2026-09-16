import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from './context/ConfigContext';
import { RouterProvider } from './context/RouterContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ConfigProvider>
  </StrictMode>,
);

