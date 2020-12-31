# shortcut-url

> Get the URL from a [web shortcut](https://en.wikipedia.org/wiki/File_shortcut) file


## Install

```
$ npm install shortcut-url
```


## Usage

```js
const shortcutUrl = require('shortcut-url');

(async () => {
	console.log(await shortcutUrl('google'));
	//=> 'https://google.com'
})();
```

In the above example it will look for the following file:

- macOS: `google.webloc`
- Linux: `google.desktop`
- Windows: `google.url`


## API

### shortcutUrl(filePath)

Returns `Promise<string>` with the URL.

#### filePath

Type: `string`

File path to the web shortcut.

Leave out the extension for cross-platform compatibility.


## Related

- [shortcut-url-cli](https://github.com/sindresorhus/shortcut-url-cli) - CLI for this module
- [open-shortcut](https://github.com/sindresorhus/open-shortcut) - Open the URL from a web shortcut file
