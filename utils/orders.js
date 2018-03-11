const orders = require('../lib/orders');
const async = require('async');
const logger = require('./logger');

module.exports = function (config, client) {
	const poloniex = new orders.poloniex(client);
	const bittrex = new orders.bittrex(client);
	const graviex = new orders.graviex(client);
	let running = false;

	this.updateOrders = () => {
		if (running) {
			logger.error('Orders:', 'Update already in progress');
			return;
		}
		running = true;


		async.series([
			callback => {
				if (!config.marketWatcher.exchanges.poloniex) {
					callback(null);
				} else {
					poloniex.updateOrders((err, res) => {
						if (err) {
							callback(err);
						} else {
							callback(null, res);
						}
					});
				}
			},
			callback => {
				if (!config.marketWatcher.exchanges.bittrex) {
					callback(null);
				} else {
					bittrex.updateOrders((err, res) => {
						if (err) {
							callback(err);
						} else {
							callback(null, res);
						}
					});
				}
			},
			callback => {
				if (!config.marketWatcher.exchanges.graviex) {
					callback(null);
				} else {
					graviex.updateOrders((err, res) => {
						if (err) {
							callback(err);
						} else {
							callback(null, res);
						}
					});
				}
			},
		],
		err => {
			if (err) {
				logger.error('Orders:', 'Error updating orders:', err);
			} else {
				logger.info('Orders:', 'Updated successfully');
			}
			running = false;
		});
	};

	if (config.marketWatcher.enabled) {
		setInterval(this.updateOrders, config.marketWatcher.orders.updateInterval);
	}
};
