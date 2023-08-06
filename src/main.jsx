import App from './App.jsx';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './redux/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
