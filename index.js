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

const xmlTagRegexp = /<.*?>/g;
const xmlEscapeRegexp = /&(#\d+|lt|gt|quot|apos|amp);/g;
const xmlUnescape = str => str.replace(xmlEscapeRegexp, (_, escape) => {
	switch (escape) {
		case 'lt': return '<';
		case 'gt': return '>';
		case 'quot': return '"';
		case 'apos': return '\'';
		case 'amp': return '&';
		default: return String.fromCharCode(parseInt(escape.substr(1), 10));
	}
});

module.exports = filepath => {
	filepath += path.extname(filepath) ? '' : getExt();

	return pify(fs.readFile)(filepath, 'utf8')
		.then(text => {
			let data = text.trim();

			const isXml = data[0] === '<';
			if (isXml) {
				data = data.replace(xmlTagRegexp, ' ');
				data = xmlUnescape(data);
			}

			return getUrls(data)[0].trim();
		})
		.catch(error => {
			if (error.code === 'ENOENT') {
				error.message = `Couldn't find a web shortcut with the name \`${path.basename(`${filepath}\``)}`;
			}

			throw error;
		});
};
