const node = require('./../node.js');

const params = {
	address: '15323650579610211509Z',
	address_delegate: '15323650579610211509Z',
	excessive_offset: '1000000',
	publicKey: '55f7d4a2b4d76cd7beb3c65cdacc460d529d4f461c318b1e7daa4318c983894b',
};

describe('Accounts API', () => {
	/* Define functions for use within tests */
	function getAccount(id, done) {
		node.get(`/api/getAccount?address=${id}`, done);
	}

	function getAccountByPublicKey(pk, done) {
		node.get(`/api/getAccount?publicKey=${pk}`, done);
	}

	function getTopAccounts(id, id2, done) {
		node.get(`/api/getTopAccounts?offset=${id}&limit=${id2}`, done);
	}

	function checkAccount(id) {
		node.expect(id).to.have.all.keys(
			'success',
			'multisignatures',
			'secondPublicKey',
			'secondSignature',
			'unconfirmedSignature',
			'publicKey',
			'balance',
			'unconfirmedBalance',
			'address',
			'u_multisignatures',
			'knowledge',
			'delegate',
			'votes',
			'voters',
			'incoming_cnt',
			'outgoing_cnt');
	}

	const checkTopAccount = id => {
		node.expect(id).to.have.all.keys(
			'address',
			'balance',
			'publicKey',
			'knowledge');
	};

	const checkTopAccounts = id => {
		for (let i = 0; i < id.length; i++) {
			if (id[i + 1]) {
				checkTopAccount(id[i]);
			}
		}
	};

	/* Define api endpoints to test */
	describe('GET /api/getAccount', () => {
		it('using known address should be ok', done => {
			getAccount(params.address, (err, res) => {
				node.expect(res.body).to.have.property('success').to.not.be.equal(undefined);
				checkAccount(res.body);
				done();
			});
		});

		it('using invalid address should fail', done => {
			getAccount('L', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using unknown address should fail', done => {
			getAccount('999999999L', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using no address should fail', done => {
			getAccount('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using known pk should be ok', done => {
			getAccountByPublicKey(params.publicKey, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				checkAccount(res.body);
				done();
			});
		});

		it('using invalid pk should fail', done => {
			getAccountByPublicKey('invalid_pk', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.not.equal(true);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using unknown pk should fail', done => {
			getAccountByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using no pk should fail', done => {
			getAccountByPublicKey('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});
	});

	/* -- if all fail, check onz for topAccounts = true */
	describe('GET /api/getTopAccounts', () => {
		it('using offset 0 and limit 100 should return 100', done => {
			getTopAccounts('0', '100', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.accounts.length).to.equal(100);
				checkTopAccounts(res.body.accounts);
				done();
			});
		});

		it('using offset 0 and limit 1 should return 1', done => {
			getTopAccounts('0', '1', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.accounts.length).to.equal(1);
				checkTopAccounts(res.body.accounts);
				done();
			});
		});

		it('using offset 100 and limit 50 should return 50', done => {
			getTopAccounts('100', '50', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.accounts.length).to.equal(50);
				checkTopAccounts(res.body.accounts);
				done();
			});
		});

		it('using offset 0 and limit 0 should return 100', done => {
			getTopAccounts('0', '0', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.accounts.length).to.equal(100);
				checkTopAccounts(res.body.accounts);
				done();
			});
		});

		it('using offset 0 and limit -1 and return 100', done => {
			getTopAccounts('0', '-1', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.accounts.length).to.equal(100);
				checkTopAccounts(res.body.accounts);
				done();
			});
		});

		it('using offset 100000 and no limit should return 0', done => {
			getTopAccounts(params.excessive_offset, '', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.accounts.length).to.equal(0);
				done();
			});
		});
	});
});
