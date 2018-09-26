# getto-detect

javascript function for static web to detect next version's path

```js
GettoDetect().from_current("1.0.0", function(path) {
  path // => "/2.1.0/index.html" (e.g.)
});
```

1. request to `HEAD /1.0.1/index.html`, `HEAD /1.1.0/index.html`, `HEAD /2.0.0/index.html`
1. if response status is 200, re-check (1) with next version
1. callback with (2) path

- version number must be follow semantic version rule


###### Table of Contents

- [Usage](#Usage)
- [License](#License)


<a id="Usage"></a>
## Usage

### Install

```
npm install --save-dev getto-detect
cp node_modules/getto-detect/dist/getto-detect.js /path/to/your/project
```

or

```
curl https://github.com/getto-systems/getto-detect/blob/master/dist/getto-detect.js -o /path/to/your/project/getto-detect.js
```

### from_current

```js
GettoDetect().from_current("1.0.0", function(path) { });
```

detect next version's path from current version

### detect

```js
GettoDetect().detect(["1.0.0", "dist"], function(path) {
  path // => /dist/index.html if HEAD /dist/index.html response == 200
});
```

detect next version's path from list of versions


<a id="License"></a>
## License

getto-detect is licensed under the [MIT](LICENSE) license.

Copyright &copy; since 2018 shun@getto.systems
