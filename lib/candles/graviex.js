const AbstractCandles = require('./abstract');
const util = require('util');

function GraviexCandles(...rest) {
	AbstractCandles.apply(this, rest);

	this.name = 'graviex';
	this.key = `${this.name}Candles`;
	this.url = 'https://graviex.net/api/v2/trades?market=onzbtc&limit=50';
	this.start = '';
	this.last = null;

	this.response = {
		error: 'message',
		data: 'result',
	};

	this.candle = {
		id: 'id',
		date: 'created_at',
		price: 'price',
		amount: 'volume',
	};

	this.acceptTrades = function (results, data) {
		return results.concat(data.reverse());
	};
}

util.inherits(GraviexCandles, AbstractCandles);
module.exports = GraviexCandles;
