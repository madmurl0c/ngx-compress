# ngx-compress
This package was initially made to compress angular applications before hosting them on a web server to make use of static brotli and gzip compression.

Feel free to contribute, modify and use this code.

## How to use

### Install the npm package
`npm install @madmurl0c/ngx-compress`

### Use it in your package.json file
Don't forget to replace `dist/prod` with your actual path.
```
scripts: [
  "build": "{YOUR BUILD TASK HERE}"
  "postbuild": "ngx-compress --path dist/prod"
]
```
### Need more help?
`npm run ngx-compress --help`

