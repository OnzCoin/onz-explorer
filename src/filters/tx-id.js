import AppFilters from './filters.module';

AppFilters.filter('txId', () => (transactionId, displayLength) => {
	if (!transactionId || displayLength <= 0) {
		return '';
	}

	const start = transactionId.substr(0, displayLength);
	const end = transactionId.substr(-(displayLength));

	return start.concat('...').concat(end);
});
