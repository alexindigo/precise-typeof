var test          = require('./common.js')
  , preciseTypeOf = require('../')
  ;

// generic tests
test('precise_typeof', function(t)
{
  runTests(t, test.samples);
});

test('precise custom objects without pojoOnly', function(t)
{
  runTests(t, test.customObjects, 'object');
});

// node specific tests
test.if(typeof process != 'undefined' && 'node' in process.versions).then('precise types in node', function(t)
{
  runTests(t, test.nodeSamples);
});

// browser specific stuff
test.if(typeof window != 'undefined').then('precise types in browser', function(t)
{
  runTests(t, test.browserSamples);
});

/**
 * Runs tests from the provided list
 *
 * @param   {object} t - test suite instance
 * @param   {array} list - list of test subjects
 * @param   {string} forceExpectedType - list of test subjects
 * @returns {void}
 */
function runTests(t, list, forceExpectedType)
{
  var s, type, expectedType;

  // generate list if needed
  list = typeof list == 'function' ? list() : list;

  while ((s = list.shift()))
  {
    type = Object.keys(s)[0];
    expectedType = forceExpectedType || type;
    t.deepEqual(preciseTypeOf(s[type]), expectedType, Object.prototype.toString.call(s[type]) + ' - expecting to be ' + expectedType);
  }

  t.end();
}
