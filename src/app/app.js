import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-gettext';
import 'angular-advanced-searchbox';
// import 'babel-polyfill';

// styles
import 'amstock3/amcharts/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'angular-advanced-searchbox/dist/angular-advanced-searchbox.min.css';
import '../assets/styles/common.css';
import '../assets/styles/flags.css';
import '../assets/styles/tableMobile.css';

// submodules
import '../components/blocks';
import '../components/address';
import '../components/transactions';
import '../components/delegate';
import '../components/delegate-monitor';
import '../components/top-accounts';
import '../components/search';
import '../components/header';
import '../components/footer';
import '../components/currency-selector';
import '../components/activity-graph';
import '../components/home';
import '../components/bread-crumb';
import '../components/market-watcher';
import '../components/network-monitor';

import '../filters';
import '../services';
import '../directives';
import './app-tools.module';
import '../shared';

const App = angular.module('onz_explorer', [
	'ngAnimate',
	'ngResource',
	'ui.router',
	'ui.bootstrap',
	'gettext',
	'angular-advanced-searchbox',
	'onz_explorer.breadCrumb',
	'onz_explorer.filters',
	'onz_explorer.services',
	'onz_explorer.header',
	'onz_explorer.footer',
	'onz_explorer.blocks',
	'onz_explorer.transactions',
	'onz_explorer.address',
	'onz_explorer.delegate',
	'onz_explorer.topAccounts',
	'onz_explorer.search',
	'onz_explorer.tools',
	'onz_explorer.currency',
	'onz_explorer.activityGraph',
	'onz_explorer.delegateMonitor',
	'onz_explorer.home',
	'onz_explorer.networkMonitor',
	'onz_explorer.marketWatcher',
]);

export default App;
