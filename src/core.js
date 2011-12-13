

// Declare _str class
var _str = function(str){
    return new _str.init(str);
}

// our initialize function
_str.init = function(str) {
    this[0] = str;
    return this;
}

// init function prototype shortcut
_str.fn = _str.init.prototype;

// helper function to extend objects
_str.fn.extend = _str.extend = function(target, options) {

    // no 2nd argument = extend self
    if (!options) target = this;

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

_str.extend({
    test: function() {
	alert('boo');
    }
});

_str.fn.extend({
    
});
