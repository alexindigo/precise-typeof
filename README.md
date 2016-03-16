# precise-typeof [![NPM Module](https://img.shields.io/npm/v/precise-typeof.svg?style=flat)](https://www.npmjs.com/package/precise-typeof)

Better `typeof`. Detects real type of the objects like `Array()`, `new Number(1)`, `new Boolean(true)`, etc.

[![PhantomJS Build](https://img.shields.io/travis/alexindigo/precise-typeof/master.svg?label=browser&style=flat)](https://travis-ci.org/alexindigo/precise-typeof)
[![Linux Build](https://img.shields.io/travis/alexindigo/precise-typeof/master.svg?label=linux:0.10-5.x&style=flat)](https://travis-ci.org/alexindigo/precise-typeof)
[![Windows Build](https://img.shields.io/appveyor/ci/alexindigo/precise-typeof/master.svg?label=windows:0.10-5.x&style=flat)](https://ci.appveyor.com/project/alexindigo/precise-typeof)

[![Coverage Status](https://img.shields.io/coveralls/alexindigo/precise-typeof/master.svg?label=code+coverage&style=flat)](https://coveralls.io/github/alexindigo/precise-typeof?branch=master)
[![Dependency Status](https://img.shields.io/david/alexindigo/precise-typeof.svg?style=flat)](https://david-dm.org/alexindigo/precise-typeof)
[![bitHound Overall Score](https://www.bithound.io/github/alexindigo/precise-typeof/badges/score.svg)](https://www.bithound.io/github/alexindigo/precise-typeof)
<!-- Not yet ![Readme](https://img.shields.io/badge/readme-tested-brightgreen.svg?style=flat)
Too many false positives [![Codacy Badge](https://img.shields.io/codacy/5f1289b78b7346498797f9f3cd674408.svg)](https://www.codacy.com/app/alexindigo/precise-typeof) -->

| compression              |    size |
| :----------------------- | ------: |
| precise-typeof.js        | 2.35 kB |
| precise-typeof.min.js    | 1.41 kB |
| precise-typeof.min.js.gz |   639 B |


## Install

```sh
$ npm install precise-typeof --save
```

## Examples

```javascript
var typeOf = require('precise-typeof');

typeOf({});               // -> 'object'
typeOf(new function(){}); // -> 'object'
typeOf([]);               // -> 'array'
typeOf(25);               // -> 'number'
typeOf(Infinity);         // -> 'number'
typeOf('ABC');            // -> 'string'
typeOf(function(){});     // -> 'function'
typeOf(Math.sin);         // -> 'function'
typeOf(undefined);        // -> 'undefined'
typeOf(true);             // -> 'boolean'
typeOf(null);             // -> 'null'
typeOf(NaN);              // -> 'nan'

// object values
typeOf(new Object());                           // -> 'object'
typeOf(new Array());                            // -> 'array'
typeOf(new Number(5));                          // -> 'number'
typeOf(new Number(Infinity));                   // -> 'number'
typeOf(new String('ABC'));                      // -> 'string'
typeOf(new Function('a', 'b', 'return a + b')); // -> 'function'
typeOf(new Boolean());                          // -> 'boolean'
typeOf(new Number('blabla'));                   // -> 'nan'

// special objects
typeOf(/s/);         // -> 'regexp'
typeOf(new Date());  // -> 'date'
typeOf(Math);        // -> 'math'
typeOf(new Error()); // -> 'error'
typeOf(arguments);   // -> 'arguments'

// node
typeOf(global);               // -> 'global'
typeOf(process);              // -> 'process'
typeOf(Buffer('B'));          // -> 'buffer'
typeOf(new Buffer(2));        // -> 'buffer'
typeOf(Buffer([62, 64, 66])); // -> 'buffer'

// es6
typeOf(Symbol('A')); // -> 'symbol'

// browser
typeOf(window);                                   // -> 'global'
typeOf(document);                                 // -> 'html'
typeOf(document.body);                            // -> 'html'
typeOf(document.getElementsByTagName('html')[0]); // -> 'html'
typeOf(document.getElementsByTagName('div'));     // -> 'html'
typeOf(document.createElement('a'));              // -> 'html'
typeOf(document.createTextNode('Abcd'));          // -> 'text'
typeOf(document.createComment('abcd'));           // -> 'comment'
typeOf(document.createEvent('Event'));            // -> 'event'
typeOf(document.createEvent('UIEvents'));         // -> 'event'
typeOf(document.createEvent('HTMLEvents'));       // -> 'event'
typeOf(document.createEvent('MouseEvents'));      // -> 'event'
```

## License

Precise-TypeOf is licensed under the MIT license.
