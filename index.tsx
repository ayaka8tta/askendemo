
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

declare global {
  interface Window {
    liff: any;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Initialize LIFF
window.liff.init({ liffId: "LIFF_ID_PLACEHOLDER" })
  .then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err: any) => {
    console.error("LIFF initialization failed", err);
    // Render anyway for testing outside LINE
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
