import React from 'react';
import ReactDOM from 'react-dom';
import Header       from './parts/Header';
import Intro        from './parts/Intro';
import MainContent  from './parts/MainContent';
import Sidebar      from './parts/Sidebar';
import Footer       from './parts/Footer';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Intro id='16' baseUrl='http://resume-data.nonlefthanded.com/wp-json/wp/v2' />, document.getElementById('intro'));
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<MainContent />, document.getElementById('main'));
ReactDOM.render(<Sidebar baseUrl='http://resume-data.nonlefthanded.com/wp-json/wp/v2' />, document.getElementById('aside'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
