

const config = require('./config.global');

/**
 * CONFIGURATION
 */
config.host = '0.0.0.0'; // Interface to listen on, 0.0.0.0 to listen on all available
config.port = 6040; // Port to listen on
config.sslenabled = false;
config.sslhost = '0.0.0.0';
config.sslport = 443;
config.sslkey = '/path/onzcoin.com.key';
config.sslcert = '/path/onzcoin.com.crt';

/**
 * ONZ node
 */
config.onz.host = '45.76.150.74';
config.onz.port = 10998;

/**
 * FreeGeoIP server
 */
config.freegeoip.host = '127.0.0.1';
config.freegeoip.port = 8080;

/**
 * Redis server
 */
config.redis.host = '127.0.0.1';
config.redis.port = 6379;
config.redis.db = 0;
config.redis.password = '';

// Time in seconds to store cache in Redis
config.cacheTTL = 20;

// Collect logs (true - enabled, false - disabled)
config.log.enabled = true;
// Output for logs - can be device file or ordinary path
config.log.file = './logs/explorer.log';
// Log level - (trace, debug, info, warn, error)
config.log.level = 'info';

/**
 * Header price tickers, Currency switcher
 */
// Exchange rates support (true - enabled, false - disabled)
config.exchangeRates.enabled = false;
// Interval in ms for checking exchange rates (default: 30 seconds)
config.exchangeRates.updateInterval = 30000;

// Configuration for different currency pairs, set false to disable pair
// ONZ/BTC pair, supported: poloniex
config.exchangeRates.exchanges.ONZ.BTC = 'poloniex';
// ONZ/CNY pair, supported: jubi, bitbays
config.exchangeRates.exchanges.ONZ.CNY = 'jubi';
// BTC/USD pair, supported: bitfinex, bitstamp, btce
config.exchangeRates.exchanges.BTC.USD = 'bitfinex';
// BTC/EUR pair, supported: bitstamp, bitmarket
config.exchangeRates.exchanges.BTC.EUR = 'bitstamp';
// BTC/RUB pair, supported: btce, exmo
config.exchangeRates.exchanges.BTC.RUB = 'btce';
// BTC/PLN pair, supported: bitmarket
config.exchangeRates.exchanges.BTC.PLN = false;

/**
 * Market watcher
 */
// Market watcher support (true - enabled, false - disabled)
config.marketWatcher.enabled = false;
// Poloniex exchange support (true - enabled, false - disabled)
config.marketWatcher.exchanges.poloniex = true;
// Bittrex exchange support (true - enabled, false - disabled);
config.marketWatcher.exchanges.bittrex = true;
// Interval in ms for updating candlestick data (default: 30 seconds)
config.marketWatcher.candles.updateInterval = 30000;
// Build candles based on trades form last 30 days
config.marketWatcher.candles.poloniex.buildTimeframe = 60 * 60 * 24 * 30;
// Interval in ms for updating order book data (default: 15 seconds)
config.marketWatcher.orders.updateInterval = 15000;

/**
 * Delegate Proposals
 */
// Delegate proposals support (true - enabled, false - disabled)
config.proposals.enabled = true;
// Interval in ms for updating delegate proposals (default: 10 minutes)
config.proposals.updateInterval = 600000;

module.exports = config;
