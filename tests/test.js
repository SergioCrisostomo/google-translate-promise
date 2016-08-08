/* jshint node:true */
'use strict';

const assert = require('assert');
const API = require('../index');

describe('Google translate API tests:', () => {

	describe('Option setting tests', () => {

		it('should use the global default option values', () => {
			const GoogleTranslate = new API();
			assert.equal(GoogleTranslate.options.timeout, 5000);
		});

		it('should set new global default option values', () => {
			const GoogleTranslateA = new API();
			GoogleTranslateA.setGlobalDefaults({timeout: 1000});
			const GoogleTranslateB = new API();
			assert.equal(GoogleTranslateB.options.timeout, 1000);
		});

		it('should set new local default option values', () => {
			const GoogleTranslateA = new API({timeout: 3000});
			GoogleTranslateA.setGlobalDefaults({timeout: 1000});
			const GoogleTranslateB = new API();
			assert.equal(GoogleTranslateA.options.timeout, 3000);
			assert.equal(GoogleTranslateB.options.timeout, 1000);
		});
	});
	describe('Translation tests', () => {

		it('should translate "Hello world!" to swedish', (done) => {
			const phrase = 'Hello world!';
			const GoogleTranslate = new API();
			GoogleTranslate.translate(phrase, 'sv', 'en').then(text => {
				assert.equal(text, 'Hej världen!');
				done();
			}).catch(reason => {
				console.log(reason);
			});
		});

		it('should translate "Hello world!" to portuguese', (done) => {
			const phrase = 'Hello world!';
			const GoogleTranslate = new API();
			GoogleTranslate.translate(phrase, 'pt', 'en').then(text => {
				assert.equal(text, 'Olá Mundo!');
				done();
			}).catch(reason => {
				console.log(reason);
			});
		});
	});

});
