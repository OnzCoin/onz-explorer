const AbstractCandles = require('./abstract');
const moment = require('moment');
const _ = require('underscore');
const util = require('util');

function GraviexCandles(client, params, ...rest) {
	AbstractCandles.apply(this, [client, params, ...rest]);

	const now = Math.floor(Date.now() / 1000);
	this.start = params && params.buildTimeframe ? (now - params.buildTimeframe) : null;
	this.end = now; // Current unix timestamp (in sec)

	this.name = 'graviex';
	this.key = `${this.name}Candles`;
	this.url = 'https://graviex.net/api/v2/trades?market=onzbtc&limit=50';

	this.response = {
		error: 'error',
		data: null,
	};

	this.candle = {
		id: 'id',
		date: 'created_at',
		price: 'price',
		amount: 'volume',
	};

	this.nextEnd = function (data) {
		return moment(_.first(data).date).subtract(1, 's').unix();
	};

	this.acceptTrades = function (results, data) {
		return results.concat(data.reverse());
	};
}

util.inherits(GraviexCandles, AbstractCandles);
module.exports = GraviexCandles;
