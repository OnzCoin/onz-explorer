import AppFilters from './filters.module';

AppFilters.filter('onz', () => amount => {
	if (isNaN(amount)) {
		return (0).toFixed(8);
	}
	return (parseInt(amount, 10) / 1e8).toFixed(8).replace(/\.?0+$/, '');
});
