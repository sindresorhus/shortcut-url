'use strict';
var path = require('path');
var fs = require('fs');
var getUrls = require('get-urls');

function getExt() {
	switch (process.platform) {
		case 'darwin':
			return '.webloc';
		case 'win32':
			return '.url';
		default:
			return '.desktop';
	}
}

module.exports = function (filepath, cb) {
	filepath += path.extname(filepath) ? '' : getExt();

	fs.readFile(filepath, 'utf8', function (err, data) {
		if (err) {
			if (err.code === 'ENOENT') {
				err.message = 'Couldn\'t find a web shortcut with the name `' + path.basename(filepath + '`');
			}

			cb(err);
			return;
		}

		cb(null, getUrls(data.replace(/<!doctype.*/i, ''))[0].trim());
	});
};
