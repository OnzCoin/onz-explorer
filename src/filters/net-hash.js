import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => nethash => {
	if (nethash === 'aa14b4d84260e00b6fc033c022a25965629ab0e8a4aafc77e64cad4cf0dc2e00') {
		return 'Testnet';
	} else if (nethash === '463aeac28885fa5be9efc4d095900f622e3d9efac8c9317b7f1e8fe804d5a039') {
		return 'Mainnet';
	}
	return 'Local';
});
