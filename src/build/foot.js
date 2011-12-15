// automatically create API methods
each(_str.fn, function(action) {

    var valid = action.substr(0, 1) === '_',
	method = action.substr(1, action.length-1);

    // only use methods starting with an underscore
    if (valid) {

	// build the public method
	_str.fn[method] = function() {
	    var args = slice.call(arguments);
	    args.unshift(method);
	    return this.manip.apply(this, args);
	}
    }
});

// Expose _str object
window._str = _str;

})();
