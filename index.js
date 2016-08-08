/* jshint node:true */
'use strict';


const request = require('request');
const Entities = require('html-entities');
const entities = new Entities.AllHtmlEntities();

// defaults
const options = {
	API_KEY: '',
	URL: 'https://www.googleapis.com/language/translate/v2',
	throttle: 0.5,
	timeout: 5000
};

class Translate {
	constructor(opts) {
		this.applyOptions(options, opts || {});
		this.queue = [];
	}

	applyOptions(defaults, newOpts) {
		Object.keys(newOpts).reduce(
			(def, prop) => (this.options[prop] = newOpts[prop], def),
			this.options = JSON.parse(JSON.stringify(defaults))
		);
	}

	setGlobalDefaults(defaults) {
		Object.keys(defaults).forEach(
			prop => options[prop] = defaults[prop]
		);
	}

	request(data, resolve, reject) {

		this.active = true;
		const timeout = setTimeout(() => {
			reject('The request timed out.');
			reject = resolve = () => {};
		}, this.options.timeout);

		request.post(data, (err, response, body) => {
			this.active = false;
			clearTimeout(timeout);
			if (err) return reject(err);

			body = JSON.parse(body || '{}');
			if (!body.data || !body.data.translations) {
				return reject(`Unexpected Google Translate API body: ${body}`);
			}

			const raw = body.data.translations[0].translatedText;
			resolve(entities.decode(raw));
			setTimeout(this.dispatch.bind(this), this.options.throttle * 1000);
		});
	}

	dispatch() {
		if (this.active || this.queue.length == 0) return;
		const next = this.queue.shift();
		this.request.apply(this, next);
	}

	handleQueue() {
		if (this.queue.length > 1) return;
		this.dispatch();
	}

	translate(text, to, from) {
		const obj = {
			url: this.options.URL,
			headers: {
				'X-HTTP-Method-Override': 'GET'
			},
			form: {
				key: this.options.API_KEY,
				q: text,
				source: from || this.options.from || 'auto',
				target: to || this.options.to
			}
		};

		if (!to) return Promise.reject('Please choose the target language')
		if (!text) return Promise.reject('Please add the text to translate')
		return new Promise((res, rej) => {
			this.queue.push([obj, res, rej]);
			this.handleQueue();
		});
	}
}

module.exports = Translate;
