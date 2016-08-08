

# google-translate-promise

### Google Translate API, Node.js module with Promises flow

Simple client for Google Translate API.

## Usage

	const GoogleTranslate = require('./index');
	const API = new GoogleTranslate({API_KEY: 'xxxxxx'});

	API.translate('Hello world!', 'en', 'sv').then(res => {
		console.log(text); // Hej världen!
	});

## Options

This module has some default options:

	const options = {
		API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY || '',
		URL: 'https://www.googleapis.com/language/translate/v2',
		throttle: 0.5,
		timeout: 5000
	};

What they do:

 - `API_KEY` is your private key to acess the API. You can get one [here](https://cloud.google.com/translate/v2/quickstart).
 - `URL` you should not need to change this.
 - `throttle` defaults to 500ms, and is there to avoid too many requests per second
 - `timeout` if the request takes longer than the _timeout_ the Promise will be rejected. Defaults to 5 seconds.

> You can pass otpions to the module in the constructor, or using `.setGlobalDefaults` method.

If the nostructor has no options, the instance will use the global defaults

## Tests

**to run tests do**

	$ npm test

**to set the `API_KEY` via environment variables do:**

Unix shell prompt

	# for just one run:
    $ GOOGLE_TRANSLATE_API_KEY=yourAPIkey npm test

	# more permanently:
    $ export GOOGLE_TRANSLATE_API_KEY=yourAPIkey
    $ node app.js

Windows:

    $ set PORT="yourAPIkey"

Windows PowerShell:

    $env:GOOGLE_TRANSLATE_API_KEY="yourAPIkey"
