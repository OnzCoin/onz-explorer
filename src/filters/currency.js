import AppFilters from './filters.module';

AppFilters.filter('currency', (numberFilter, onzFilter) => (amount, currency, decimalPlaces) => {
	const onz = onzFilter(amount);
	let factor = 1;

	if (currency.tickers && currency.tickers.ONZ && currency.tickers.ONZ[currency.symbol]) {
		factor = currency.tickers.ONZ[currency.symbol];
	} else if (currency.symbol !== 'ONZ') {
		// Exchange rate not available for current symbol
		return 'N/A';
	}

	const decimals = (currency.symbol === 'ONZ' || currency.symbol === 'BTC') ? decimalPlaces : 2;
	if (decimals && onz > 0) {
		return numberFilter((onz * factor), decimals);
	}
	return numberFilter((onz * factor), 8).replace(/\.?0+$/, '');
});
