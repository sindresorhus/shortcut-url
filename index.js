'use strict';
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');
const getUrls = require('get-urls');

const readFile = promisify(fs.readFile);

const getExtension = () => {
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

const xmlUnescape = string => string.replace(xmlEscapeRegexp, (_, escape) => {
	switch (escape) {
		case 'lt':
			return '<';
		case 'gt':
			return '>';
		case 'quot':
			return '"';
		case 'apos':
			return '\'';
		case 'amp':
			return '&';
		default:
			return String.fromCharCode(parseInt(escape.slice(1), 10));
	}
});

module.exports = async filePath => {
	filePath += path.extname(filePath) ? '' : getExtension();

	let data;
	try {
		data = await readFile(filePath, 'utf8');
	} catch (error) {
		if (error.code === 'ENOENT') {
			error.message = `Couldn't find a web shortcut with the name \`${path.basename(`${filePath}\``)}`;
		}

		throw error;
	}

	data = data.trim();

	const isXml = data[0] === '<';
	if (isXml) {
		data = data.replace(xmlTagRegexp, ' ');
		data = xmlUnescape(data);
	}

	return [...getUrls(data)][0].trim();
};
