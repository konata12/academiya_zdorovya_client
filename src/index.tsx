import ReactDOM from 'react-dom/client';
import App from 'App';

// STYLES
import 'styles/index.scss'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    {/* <Provider> */}
      <App />
    {/* </Provider> */}
  </BrowserRouter>
);