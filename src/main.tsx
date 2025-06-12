import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ThemeProviderWrapper from './core/context/mui-overrides/theme-context';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
          <ThemeProviderWrapper>

    <App />
    </ThemeProviderWrapper>
  </React.StrictMode>
);
