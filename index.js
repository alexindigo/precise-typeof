'use strict';

var isBuffer = require('is-buffer');

// Public API
module.exports = preciseTypeOf;

/**
 * Detects real type of the objects like 'Array()', `new Number(1)`, `new Boolean(true)`, etc
 *
 * @param   {mixed} obj - object to get type of
 * @returns {string} precise type
 */
function preciseTypeOf(obj)
{
  var type, stamp = Object.prototype.toString.call(obj);

  if (!type && obj === undefined) type = 'undefined';
  if (!type && obj === null) type = 'null';

  if (!type && isBuffer(obj)) type = 'buffer';

  if (!type && typeof window == 'object' && obj === window) type = 'global';
  if (!type && typeof global == 'object' && obj === global) type = 'global';

  if (!type && typeof obj == 'number' && isNaN(obj)) type = 'nan';
  if (!type && typeof obj == 'object' && stamp == '[object Number]' && isNaN(obj)) type = 'nan';

  if (!type && typeof obj == 'object' && stamp.substr(-6) == 'Event]') type = 'event';
  if (!type && stamp.substr(0, 12) == '[object HTML') type = 'html';
  if (!type && stamp.substr(0, 12) == '[object Node') type = 'html';

  // last resort
  if (!type) type = Object.prototype.toString.call(obj).match(/\[object\s*([^\]]+)\]/)[1].toLowerCase();

  return type;
}
