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

// helper function for basic loop
function each(data, fn) {

    var len, i;

    if (isString(data)) data = data.split(' ');

    len = data.length;

    if (isArray(data)) {
	for (i = 0; i < len; i++ ) fn(i, data[i]);
    } else {
	for (i in data) fn(i, data[i]);
    }
}

// string type check helper
function isString(it) {
    return typeof it === 'string';
}

// object type check helper
function isObject(it) {
    return typeof it  === 'object';
}

// boolean type check helper
function isBoolean(it) {
    return typeof it === 'boolean';
}

// array type check helper
function isArray(it) {
    if (isObject(it)) return it.constructor == Array;
    else return false;
}
