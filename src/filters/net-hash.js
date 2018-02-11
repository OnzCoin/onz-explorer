import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => nethash => {
	if (nethash === 'aa14b4d84260e00b6fc033c022a25965629ab0e8a4aafc77e64cad4cf0dc2e00') {
		return 'Testnet';
	} else if (nethash === 'ef56692f7973f7a8e82d6bd5bc68d5f514e4c3ed97d4cfca0345fddd0f421999') {
		return 'Mainnet';
	}
	return 'Local';
});
