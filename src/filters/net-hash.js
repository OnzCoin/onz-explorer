import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => nethash => {
	if (nethash === '52fd9a2f0857ca94510fae33c5e71b34eb5f9fa45813c5bbf6ee796c3731dbd9') {
		return 'Testnet';
	} else if (nethash === '463aeac28885fa5be9efc4d095900f622e3d9efac8c9317b7f1e8fe804d5a039') {
		return 'Mainnet';
	}
	return 'Local';
});
