import AppFilters from './filters.module';

AppFilters.filter('bId', () => blockId => {
	if (!blockId) {
		return '';
	}

	const start = blockId.substr(0, 6);
	const end = blockId.substr(-7);

	return start.concat('...').concat(end);
});
