// Logging modile, logs based on levels 1-7
/*
Nolog (level -1)
Don't log at all, used for testing

Emergency (level 0)
The highest priority, usually reserved for catastrophic failures and reboot notices.

Alert (level 1)
A serious failure in a key system.

Critical (level 2)
A failure in a key system.

Error (level 3)
Something has failed.

Warning (level 4)
Something is amiss and might fail if not corrected.

Notice (level 5)
Things of moderate interest to the user or administrator.

Info (level 6)
The lowest priority that you would normally log, and purely informational in nature.

Debug (level 7)
The lowest priority, and normally not logged except for messages from the kernel.
*/
var colors = require('colors');
var currentLevel = 6;
/**
 * Expose the root.
 */

var conf;

exports = module.exports = new logger();

/**
 * Expose `logger`.
 */

exports.logger = logger;

/*
 * Logger constructor
 *
 * Takes an nConf with log_level
 */
function logger(nConf) {
	conf = nConf;
	if(typeof conf !== 'undefined') {
		currentLevel = Number(conf.log_level);
		// console.log('Set log level to: ' + currentLevel);
	}
	else {
		// console.log('Log level not defined');
	}
};

function log(statement, level, callback) {
// console.log('Starting to log statement...');
	if(level === null || typeof(level) == 'undefined') {
		// console.log('Level was set to null, resetting level to 6...');
		// Default the log level to info
		level = 6;
	}

	if(typeof(callback) === 'undefined') {
		callback = console.log;
	}

	// Check to make sure we need to log something
	// console.log('Level of this statement to log: ' + level);
	// console.log('Current level of this statement to log: ' + currentLevel);
	// console.log('Result of level <= currentLevel: ' + level <= currentLevel);
	if(level <= currentLevel) {
		var logStatement = "";
		switch(level) {
			case -1:
				callback('');
			break;
			case 0:
				logStatement += "[ 0, EMR ] : ";
				logStatement += statement;
				callback(logStatement.red);
			break;
			case 1:
				logStatement += "[ 1, ALT ] : ";
				logStatement += statement;
				callback(logStatement.red);
			break;
			case 2:
				logStatement += "[ 2, CRT ] : ";
				logStatement += statement;
				callback(logStatement.red);
			break;
			case 3:
				logStatement += "[ 3, ERR ] : ";
				logStatement += statement;
				callback(logStatement.red);
			break;
			case 4:
				logStatement += "[ 4, WRN ] : ";
				logStatement += statement;
				callback(logStatement.yellow);
			break;
			case 5:
				logStatement += "[ 5, NTC ] : ";
				logStatement += statement;
				callback(logStatement);
			break;
			case 6:
				logStatement += "[ 6, INF ] : ";
				logStatement += statement;
				callback(logStatement.green);
			break;
			case 7:
				logStatement += "[ 7, DBG ] : ";
				logStatement += statement;
				callback(logStatement.cyan);
			break;
			default:
				throw new Error("Invalid log level submitted! Level: " + level + ", Statement: " + statement);
		}
	}
};

logger.prototype.setLogLevel = function(level) {
	currentLevel = level;
};

logger.prototype.getLogLevel = function() {
	return currentLevel;
};

logger.prototype.warn = function(statement, callback) {
	log(statement, 4, callback);
};

logger.prototype.info = function(statement, callback) {
	log(statement, 6, callback);
};

logger.prototype.debug = function(statement, callback) {
	log(statement, 7, callback);
};

logger.prototype.log = function(statement, level, callback) {
	log(statement, level, callback);
};
