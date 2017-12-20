import AppTransactions from './transactions.module';
import template from './transactions.html';

const TransactionsConstructor = function ($rootScope, $stateParams, $location, $http) {
	const vm = this;
	vm.getTransaction = () => {
		$http.get('/api/getTransaction', {
			params: {
				transactionId: $stateParams.txId,
			},
		}).then(resp => {
			if (resp.data.success) {
				vm.tx = resp.data.transaction;
			} else {
				throw new Error('Transaction was not found!');
			}
		}).catch(() => {
			$location.path('/');
		});
	};

	vm.getTransaction();
};

AppTransactions.component('transactions', {
	template,
	controller: TransactionsConstructor,
	controllerAs: 'vm',
});

