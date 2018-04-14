import AppSearch from './search.module';
import template from './search.html';

AppSearch.directive('search', ($stateParams, $location, $timeout, Global, $http) => {
	const SearchCtrl = function () {
		const sch = this;
		this.loading = false;
		this.badQuery = false;

		const _badQuery = () => {
			this.badQuery = true;

			$timeout(() => {
				this.badQuery = false;
			}, 4000);
		};

		const _resetSearch = () => {
			this.q = '';
			this.loading = false;

			$timeout(() => {
				sch.showingResults = false;
			}, 200);
		};

		this.hideSuggestion = () => {
			_resetSearch();
		};

		this.search = () => {
			this.badQuery = false;
			this.loading = true;
			sch.showingResults = false;

			$http.get('/api/search', {
				params: {
					id: this.q,
				},
			}).then(resp => {
				sch.loading = false;
				if (resp.data.success === false) {
					_badQuery();
				} else if (resp.data.result.id) {
					_resetSearch();

					$location.path(`/${resp.data.result.type}/${resp.data.result.id}`);
				} else if (resp.data.result.delegates) {
					sch.results = resp.data.result.delegates.slice(0, 5);
					sch.showingResults = true;
				}
			});
		};
	};

	const SearchLink = function () {
	};

	return {
		restrict: 'E',
		link: SearchLink,
		controller: SearchCtrl,
		controllerAs: 'sch',
		template,
	};
});
