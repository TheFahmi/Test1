import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// mdbreact
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';

import './supports/font-awesome/css/font-awesome.min.css';
// css for card in homepage
import './supports/css/bodybackground.css';
// css for carousel 
import './supports/css/forcarousel.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// add source from sidenav and navbar with jquery
// import './vendor/jquery-easing/jquery.easing.min.js';
// import './vendor/chart.js/Chart.min.js';
// import './vendor/jquery/jquery.min.js';
// import './js/sb-admin.min.js';
// import './vendor/fontawesome-free/css/all.min.css';
// import './css/sb-admin.css';
// import './supports/css/bodybackground.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
