import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store/index.js';
import App from './App.jsx';
import './main.scss';
import { LocaleProvider } from './contexts/TranslationContext.js';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
