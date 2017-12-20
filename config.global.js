const config = {};
config.onz = {};
config.freegeoip = {};
config.redis = {};
config.proposals = {};
config.log = {};
config.exchangeRates = {
	exchanges: {
		ONZ: {},
		BTC: {},
	},
};
config.marketWatcher = { exchanges: {}, candles: { poloniex: {} }, orders: {} };

module.exports = config;
