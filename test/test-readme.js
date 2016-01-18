// var fs        = require('fs')
//   , path      = require('path')
//   , test      = require('./common.js')
//   , deeply    = require('../')
//   , reamde    = require('reamde')
//   , content   = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf-8')
//   , examples
//   ;
//
// examples = reamde(content, {
//   runtime:
//   [
//     'callback'
//   ],
//   replace:
//   {
//     'require(\'deeply\')'         : deeply,
//     'require(\'deeply/mutable\')' : deeply.mutable,
//     'assert.deepEqual('           : 'callback('
//   }
// });
//
// // Run tests
// test('readme', function test_readme_exampless(t)
// {
//   t.plan(examples.length);
//
//   examples.forEach(function(ex)
//   {
//     ex(function(actual, expected)
//     {
//       t.deepEqual(actual, expected, 'actual '+stringify(actual)+', expected '+stringify(expected));
//     });
//   });
// });
