import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { rootStore } from '../store';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const persistor = persistStore(rootStore);
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={rootStore}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
};

export default MyApp;
