import React from 'react';
import { ThemeProvider } from '@mui/system';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import{ store} from './redux/store';
import { ToastContainer } from 'react-toastify';
import { theme } from './theme';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>

<Provider store={store}>
{/* <PersistGate loading={null} persistor={persistor}> */}

<App />
{/* </PersistGate> */}
<ToastContainer/>

</Provider>

</>
);



