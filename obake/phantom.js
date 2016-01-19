/* eslint-env browser */
/* eslint-disable no-eval */
/* global phantom, window */

// this is a phantomjs script. NOT a node script.
var webpage = require('webpage')
  , system  = require('system')
  , fs      = require('fs')
  ;

var page = webpage.create()
  , js   = system.stdin.read()
  ;

page.onConsoleMessage = onConsoleMessage;
//page.onCallback = onCallback;
page.onError = onError;
phantom.onError = onError;

page.open(system.args[1], function(stat)
{
  if(stat !== 'success')
  {
    system.stderr.write('Phantom cannot open requested html file: "' + system.args[1] + '"');
    phantom.exit(1);
    return;
  }

  // this function executes `run` in a sandbox, we pass it the js string
  page.evaluateAsync(run, 0, js);
});

/**
 * [onError description]
 * @param   {[type]} msg [description]
 * @param   {[type]} trace [description]
 * @returns {void}
 */
function onError(msg, trace)
{
  var error = {message: msg, trace: trace};

  system.stderr.write(JSON.stringify(error));
  phantom.exit(1);
}

/**
 * [onCallback description]
 * @returns {void}
 */
// function onCallback(done)
// {
// console.log('GGGGGGGGGGGGGG');
//
//   system.stdout.write('\n\n--- 00003 >' + done + '< -----\n\n\n');
//   system.stderr.write('\n\n--- 00004 >' + done + '< -----\n\n\n');
//
// //  saveCoverage(_page);
//   system.stdout.write('\n\n--- BOOOM -----\n\n\n');
//   phantom.exit(0);
// }

/**
 * [onConsoleMessage description]
 * @param   {[type]} msg [description]
 * @returns {void}
 */
function onConsoleMessage(msg)
{
  system.stdout.write(msg + '\n');

  // if success generate coverage data
  if (msg == '# ok')
  {
    saveCoverage(page);
  }
}

/**
 * [run description]
 * @param   {[type]} c [description]
 * @returns {void}
 */
function run(c)
{
  eval(c);
}

/**
 * [saveCoverage description]
 * @param   {[type]} _page [description]
 * @returns {void}
 */
function saveCoverage(_page)
{
  var destination = 'coverage/coverage-phantomjs.json';

  var coverage = _page.evaluate(function()
  {
    return window.__coverage__;
  });

  if (coverage)
  {
    system.stderr.write('Writing coverage to ' + destination);
    fs.write(destination, JSON.stringify(coverage), 'w');
  }
  else
  {
    console.log('No coverage data generated');
  }
}
