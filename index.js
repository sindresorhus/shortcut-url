import process from 'node:process';
import path from 'node:path';
import {promises as fs} from 'node:fs';
import getUrls from 'get-urls';

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
			return String.fromCharCode(Number.parseInt(escape.slice(1), 10));
	}
});

export default async function shortcutUrl(filePath) {
	filePath += path.extname(filePath) ? '' : getExtension();

	let data;
	try {
		data = await fs.readFile(filePath, 'utf8');
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
}
