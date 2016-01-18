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

// pass it further
module.exports = test;
