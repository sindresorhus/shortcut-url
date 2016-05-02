'use strict';
const path = require('path');
const fs = require('fs');
const getUrls = require('get-urls');
const pify = require('pify');

const getExt = () => {
	switch (process.platform) {
		case 'darwin':
			return '.webloc';
		case 'win32':
			return '.url';
		default:
			return '.desktop';
	}
};

module.exports = filepath => {
	filepath += path.extname(filepath) ? '' : getExt();

	return pify(fs.readFile)(filepath, 'utf8')
		.then(data => getUrls(data.replace(/<!doctype.*/i, ''))[0].trim())
		.catch(err => {
			if (err.code === 'ENOENT') {
				err.message = `Couldn't find a web shortcut with the name \`${path.basename(`${filepath}\``)}`;
			}

			throw err;
		});
};
