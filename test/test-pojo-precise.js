var test          = require('./common.js')
  , preciseTypeOf = require('../')
  ;

// generic tests
test('precise_typeof with pojoOnly', function(t)
{
  runTests(t, test.samples);
});

test('precise custom objects with pojoOnly', function(t)
{
  runTests(t, test.customObjects);
});

// node specific tests
test.if(typeof process != 'undefined' && 'node' in process.versions).then('precise types in node with pojoOnly', function(t)
{
  runTests(t, test.nodeSamples);
});

// browser specific stuff
test.if(typeof window != 'undefined').then('precise types in browser with pojoOnly', function(t)
{
  runTests(t, test.browserSamples);
});

/**
 * Runs tests from the provided list
 *
 * @param   {object} t - test suite instance
 * @param   {array} list - list of test subjects
 * @returns {void}
 */
function runTests(t, list)
{
  var s, type;

  // generate list if needed
  list = typeof list == 'function' ? list() : list;

  while ((s = list.shift()))
  {
    type = Object.keys(s)[0];
    t.deepEqual(preciseTypeOf(s[type], {pojoOnly: true}), type, Object.prototype.toString.call(s[type]) + ' - expecting to be ' + type);
  }

  t.end();
}
