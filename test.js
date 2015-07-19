'use strict';
var test = require('ava');
var fn = require('./');

test('main', function (t) {
	t.plan(2);

	fn('fixture/google', function (err, url) {
		t.assert(!err, err);
		t.assert(url === 'https://google.com');
	});
});

test('with extension', function (t) {
	t.plan(2);

	fn('fixture/google.webloc', function (err, url) {
		t.assert(!err, err);
		t.assert(url === 'https://google.com');
	});
});
