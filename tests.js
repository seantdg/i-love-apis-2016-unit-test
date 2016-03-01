var expect = require('expect');
var sinon = require('sinon');
var jsFile = './myfile.js';
var contextVars = {};

//Mocha Tests here:
describe('Timestamps are converted to the correct day', function() {
	it('Monday is converted correctly', function() {
		contextGetVariableMethod.withArgs("system.timestamp").returns("1456754738613");
		loadJS();
		expect(contextVars["my.day"]).toEqual('Monday');
	});

	it('Wednesday is converted correctly', function() {
		contextGetVariableMethod.withArgs("system.timestamp").returns("1456838240159");
		loadJS();
		expect(contextVars["my.day"]).toEqual('Tuesday');
	});
	
});

//Create Apigee Context object:
GLOBAL.context = {
	getVariable: function(variable) {},
	setVariable: function(variable, value) {}
};

var contextGetVariableMethod, contextSetVariableMethod;

// This method will execute before every it() method in the test
// we are stubbing all Apigee objects and the methods we need here
beforeEach(function() {
	contextGetVariableMethod = sinon.stub(context, 'getVariable');
	contextSetVariableMethod = sinon.stub(context, 'setVariable',
		function(a, b) {
			contextVars[a] = b;
		}
	);
});

// restore all stubbed methods back to their original implementation
afterEach(function() {
	contextGetVariableMethod.restore();
	contextSetVariableMethod.restore();
});

function loadJS() {
	//ensure js can be included without error
	var errorThrown = false;
	try {
		requireUncached(jsFile);
	} catch (e) {
		console.log(e.stack);
		errorThrown = true;
	}
	expect(errorThrown).toEqual(false);
}

// node.js caches modules that is imported using 'require'
// this utility function prevents caching between it() functions - don't forget that variables are global in our javascript file
function requireUncached(module) {
	delete require.cache[require.resolve(module)];
	return require(module);
}