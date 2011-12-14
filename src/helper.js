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
    if (typeof data === 'string') data = data.split(' ');
    var len = data.length || 0, i = 0;
    for (; i < len; i++ ) fn(i, data[i]);
}

// string type check helper
function isString(it) {
    return (typeof(it) == 'string');
}

// array type check helper
function isArray(it) {
    if (typeof(it) == 'object') return it.constructor == Array;
    else return false;
}
