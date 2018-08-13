'use strict';

// Public API
module.exports = preciseTypeOf;

/**
 * Detects real type of the objects like 'Array()', `new Number(1)`, `new Boolean(true)`, etc
 *
 * @param   {mixed} obj - object to get type of
 * @param   {object} [options] - object to get type of
 * @returns {string} precise type
 */
function preciseTypeOf(obj, options)
{
  var type, stamp = Object.prototype.toString.call(obj);

  options = options || {};

  if (!type && obj === undefined) type = 'undefined';
  if (!type && obj === null) type = 'null';

  if (!type && obj.constructor && typeof obj.constructor.isBuffer == 'function' && obj.constructor.isBuffer(obj)) type = 'buffer';

  if (!type && typeof window == 'object' && obj === window) type = 'global';
  if (!type && typeof global == 'object' && obj === global) type = 'global';

  if (!type && typeof obj == 'number' && isNaN(obj)) type = 'nan';
  if (!type && typeof obj == 'object' && stamp == '[object Number]' && isNaN(obj)) type = 'nan';

  if (!type && typeof obj == 'object' && stamp.substr(-6) == 'Event]') type = 'event';
  if (!type && stamp.substr(0, 12) == '[object HTML') type = 'html';
  if (!type && stamp.substr(0, 12) == '[object Node') type = 'html';

  // last resort
  if (!type) type = stamp.match(/\[object\s*([^\]]+)\]/)[1].toLowerCase();

  // be even more precise by reporting "instance of" names
  if (type == 'object' && options.pojoOnly) {
    // some constructors don't have names
    type = obj.constructor.name || 'unknown';

    // precerve `object` response for POJOs
    if (type == 'Object') type = 'object';
  }

  return type;
}
