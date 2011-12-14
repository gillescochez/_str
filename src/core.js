// _str name space
var _str = function(str){
    return new _str.init(str);
}

// our initialize function
_str.init = function(str) {
    this[0] = str;
    return this;
}

// init function prototype linking
_str.fn = _str.init.prototype;

// helper function to extend objects
function extend(target, options) {

    // function scope variables
    var name, src, copy;

    // Extend the base object
    for (name in options) {
	
	// grab original and new value
	src = target[name];
	copy = options[name];

	// Prevent never-ending loop
	if (target === copy) continue;

	// Don't copy undefined values
	if (copy !== undefined) target[name] = copy;
    }

    // Return the modified object
    return target;
}

// extend helper linking
_str.extend = extend;

// herlper function for basic loop
function each(data, fn) {
    if (typeof data === 'string') data = data.split(' ');
    var len = data.length || 0, i = 0;
    for (; i < len; i++ ) fn(i, data[i]);
}

// each helper linking
_str.each = each;

// string type check helper
function isString(value) {
    return (typeof(value) == 'string');
}

// isString helper linking
_str.isString = isString;
