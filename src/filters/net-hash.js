import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => nethash => {
	if (nethash === '570f81c67882dbcbebf8b84205a78a42cd98561683f878dae8e8c7ea2f54033b') {
		return 'Testnet';
	} else if (nethash === '463aeac28885fa5be9efc4d095900f622e3d9efac8c9317b7f1e8fe804d5a039') {
		return 'Mainnet';
	}
	return 'Local';
});
