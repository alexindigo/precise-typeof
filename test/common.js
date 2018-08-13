var test = require('tape');

// augment tape to provide extra useful methods

/**
 * Provides conditional skip method
 * Allows to discriminate browser-/node- only or custom condition tests
 *
 * @param   {mixed} condition - condition to evaluate
 * @returns {object} - `.then` function referencing either `test` if condition evaluated truthy,
 *                     or `test.skip` otherwise, and `.else` method for opposite action.
 */
test.if = function(condition)
{
  return {
    then: condition ? test : test.skip,
    else: condition ? test.skip : test
  };
};

module.exports = test;

// add samples
module.exports.samples = function(){ return [
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
]; };

module.exports.customObjects = function(){ return [
  {'Moment': new function Moment(){}},
  {'ABC': new function ABC(){}},
  {'unknown': new function(){}},
  {'object': new Object()}
]; };

module.exports.nodeSamples = function(){ return [
  {'global' : global},
  {'process': process},
  {'buffer' : Buffer('B')},
  {'buffer' : new Buffer('C')},
  {'buffer' : Buffer(1)},
  {'buffer' : new Buffer(2)},
  {'buffer' : Buffer([62, 64, 66])},
  {'buffer' : new Buffer([92, 94, 96])},
  {'symbol': Symbol('A')}
]; };

module.exports.browserSamples = function(){ return [
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
