import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => nethash => {
	if (nethash === '843351db5e4434c7660035204456c2cb30d362f0fb4aaa30e0c20d6f4d197fda') {
		return 'Testnet';
	} else if (nethash === '463aeac28885fa5be9efc4d095900f622e3d9efac8c9317b7f1e8fe804d5a039') {
		return 'Mainnet';
	}
	return 'Local';
});
