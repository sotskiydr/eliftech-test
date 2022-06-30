import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store/store';
import App from './App';
import './index.css';
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

const store = setupStore();
const container = document.getElementById('root')!;
const root = createRoot(container);

let persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
              <App />
          </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
