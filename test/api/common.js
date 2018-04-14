const node = require('./../node.js');

const params = {
	blockId: '6524861224470851795',
	address: '15323650579610211509Z',
	tx: '1465651642158264047',
	username: 'genesis_1',
};

describe('Common API', () => {
	/* Define functions for use within tests */
	const getVersion = done => {
		node.get('/api/version', done);
	};

	const getPriceTicker = done => {
		node.get('/api/getPriceTicker', done);
	};

	const getSearch = (id, done) => {
		node.get(`/api/search?id=${id}`, done);
	};

	/* Define api endpoints to test */
	describe('GET /api/version', () => {
		it('should be ok', done => {
			getVersion((err, res) => {
				node.expect(res.body).to.have.property('version');
				done();
			});
		});
	});

	describe('GET /api/getPriceTicker', () => {
		it('should be ok', done => {
			getPriceTicker((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('tickers').that.is.an('object');
				done();
			});
		});
	});


	describe('GET /api/search', () => {
		it('using known block should be ok', done => {
			getSearch(params.blockId, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('block');
				node.expect(res.body.result.id).to.equal(params.blockId);
				done();
			});
		});

		it('using known height should be ok', done => {
			getSearch('1', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('block');
				node.expect(res.body.result.id).to.equal(params.blockId);
				done();
			});
		});

		it('using known address should be ok', done => {
			getSearch(params.address, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('address');
				node.expect(res.body.result.id).to.equal(params.address);
				done();
			});
		});

		it('using known transaction should be ok', done => {
			getSearch(params.tx, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('tx');
				node.expect(res.body.result.id).to.equal(params.tx);
				done();
			});
		});

		it('using known delegate should be ok', done => {
			getSearch(params.username, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('delegate');
				node.expect(res.body.result.delegates[0].address).to.equal(params.address);
				done();
			});
		});

		it('using partial known delegate should be ok', done => {
			getSearch('gene', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('delegate');
				node.expect(res.body.result.delegates[0].address).to.equal(params.address);
				done();
			});
		});

		it('using no input should fail', done => {
			getSearch('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error').to.be.a('string');
				done();
			});
		});
	});
});
