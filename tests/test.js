/* jshint node:true */
'use strict';

const assert = require('assert');
const API = require('../index');

describe('Google translate API tests:', () => {

	it('should use the global default option values', () => {
		const translate = new API();
		assert.equal(translate.options.timeout, 5000);
	});

	it('should set new global default option values', () => {
		const translateA = new API();
		translateA.setGlobalDefaults({timeout: 1000});
		const translateB = new API();
		assert.equal(translateB.options.timeout, 1000);
	});

	it('should set new local default option values', () => {
		const translateA = new API({timeout: 3000});
		translateA.setGlobalDefaults({timeout: 1000});
		const translateB = new API();
		assert.equal(translateA.options.timeout, 3000);
		assert.equal(translateB.options.timeout, 1000);
	});

});
