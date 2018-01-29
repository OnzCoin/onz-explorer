import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => nethash => {
	if (nethash === 'a0c38f0dd302a6cf5ceef3d9dc5ccf0a12a34ab39c0cc42cf2d2602d8b44b0ad') {
		return 'Testnet';
	} else if (nethash === '463aeac28885fa5be9efc4d095900f622e3d9efac8c9317b7f1e8fe804d5a039') {
		return 'Mainnet';
	}
	return 'Local';
});
