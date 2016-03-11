var test          = require('./common.js')
  , preciseTypeOf = require('../')
  ;

var samples = [
  {'object'   : {}},
  {'array'    : []},
  {'number'   : 5},
  {'number'   : Infinity},
  {'string'   : 'ABC'},
  {'function' : function(){}},
  {'function' : Math.sin},
  {'undefined': undefined},
  {'boolean'  : true},
  {'null'     : null},
  {'nan'      : NaN},

  // object values
  {'object'   : new Object()},
  {'array'    : new Array()},
  {'number'   : new Number(5)},
  {'number'   : new Number(Infinity)},
  {'string'   : new String('ABC')},
  {'function' : new Function('a', 'b', 'return a + b')},
  {'boolean'  : new Boolean()},
  {'nan'      : new Number('blabla')},

  // special objects
  {'regexp'   : /s/},
  {'date'     : new Date()},
  {'math'     : Math},
  {'error'    : new Error()},
  {'arguments': arguments}
];

var nodeSamples = function(){ return [
  {'global' : global},
  // {'process': process},
  {'buffer' : Buffer('B')},
  {'buffer' : new Buffer('C')},
  {'buffer' : Buffer(1)},
  {'buffer' : new Buffer(2)},
  {'buffer' : Buffer([62, 64, 66])},
  {'buffer' : new Buffer([92, 94, 96])}
]; };

// seems like util.inspect in pre-io.js doesn't handle Symbols correctly
var newNodeSamples = function(){ return [
  {'symbol': new Symbol('A')}
]; };

var browserSamples = function(){ return [
  {'global' : window},
  {'html'   : document},
  {'html'   : document.body},
  {'html'   : document.getElementsByTagName('html')[0]},
  {'html'   : document.getElementsByTagName('div')},
  {'html'   : document.createElement('a')},
  {'text'   : document.createTextNode('Abcd')},
  {'comment': document.createComment('abcd')},
  {'event'  : document.createEvent('Event')},
  {'event'  : document.createEvent('UIEvents')},
  {'event'  : document.createEvent('HTMLEvents')},
  {'event'  : document.createEvent('MouseEvents')}
]; };

// generic tests
test('precise_typeof', function(t)
{
  runTests(t, samples);
});

// node specific tests
test.if(typeof process != 'undefined' && 'node' in process.versions).then('precise types in node', function(t)
{
  runTests(t, nodeSamples);
});

// new node specific
test.if(typeof process != 'undefined' && parseInt(process.versions.node)).then('precise types in new node', function(t)
{
  runTests(t, newNodeSamples);
});

// browser specific stuff
test.if(typeof window != 'undefined').then('precise types in browser', function(t)
{
  runTests(t, browserSamples);
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
    t.deepEqual(preciseTypeOf(s[type]), type, Object.prototype.toString.call(s[type]) + ' - expecting to be ' + type);
  }

  t.end();
}
