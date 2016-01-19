#!/usr/bin/env node

var path          = require('path');
var childProcess  = require('child_process');
var phantomscript = path.join(__dirname, 'phantom.js');
var ghostface     = getGhost(phantomscript);
var ghostcli      = require('ghostface/lib/cli');
var chalk         = require('ghostface/node_modules/chalk');
var error         = chalk.bold.red;

// get cli arguments as usual
ghostcli(process.argv.slice(2), onCli);

/**
 * [onCli description]
 * @param   {[type]} err [description]
 * @param   {[type]} message [description]
 * @param   {[type]} options [description]
 * @returns {void}
 */
function onCli(err, message, options)
{
  if (err)
  {
    console.error(error('\nYou had errors in your syntax. Use --help for further information.'));

    err.forEach(function(e)
    {
      console.error(e.message);
    });

    return;
  }
  else if (message)
  {
    console.log(message);
    return;
  }

  // run ghostface
  ghostface(options, process, onExit);
}

/**
 * [getGhost description]
 * @param   {string} customScript - filepath of the phantomjs script
 * @returns {function} – ghostface instance
 */
function getGhost(customScript)
{
  var mod, originalSpawn = childProcess.spawn;

  childProcess.spawn = function(cmd, args)
  {
    args[0] = customScript;
    return originalSpawn.call(childProcess, cmd, args);
  };

  // run ghostface
  mod = require('ghostface');

  // restore spawn
  childProcess.spawn = originalSpawn;

  return mod;
}

/**
 * [onExit description]
 * @param   {[type]} code [description]
 * @param   {[type]} signal [description]
 * @returns {void}
 */
function onExit(code, signal)
{
  if (code > 0)
  {
    console.error('\nphantomjs exited abnormally: %d', code);
  }

  process.exit(code || signal === 'SIGTERM' ? 0 : 1);
}
