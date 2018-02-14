import AppFilters from './filters.module';

AppFilters.filter('bId', () => (blockId, displayLength) => {
	if (!blockId) {
		return '';
	}

	const start = blockId.substr(0, displayLength);
	const end = blockId.substr(-(displayLength));

	return start.concat('...').concat(end);
});
