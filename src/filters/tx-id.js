import AppFilters from './filters.module';

AppFilters.filter('txId', () => transactionId => {
	if (!transactionId) {
		return '';
	}

	const start = transactionId.substr(0, 6);
	const end = transactionId.substr(-7);

	return start.concat('...').concat(end);
});
