# shortcut-url [![Build Status](https://travis-ci.org/sindresorhus/shortcut-url.svg?branch=master)](https://travis-ci.org/sindresorhus/shortcut-url)

> Get the URL from a [web shortcut](https://en.wikipedia.org/wiki/File_shortcut) file


## Install

```
$ npm install --save shortcut-url
```


## Usage

```js
const shortcutUrl = require('shortcut-url');

shortcutUrl('google').then(url => {
	console.log(url);
	//=> 'https://google.com'
});
```

In the above example it will look for the following file:

- macOS: `google.webloc`
- Linux: `google.desktop`
- Windows: `google.url`


## API

### shortcutUrl(filepath)

Returns a promise for the URL.

#### filepath

Type: `string`

Filepath to the web shortcut.
Leave out the extension for cross-platform compatibility.


## Related

- [shortcut-url-cli](https://github.com/sindresorhus/shortcut-url-cli) - CLI for this module
- [open-shortcut](https://github.com/sindresorhus/open-shortcut) - Open the URL from a web shortcut file


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
