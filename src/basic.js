// add basic methods
extend(_str.fn, {
    // handle all manipulation (TODO Add history tracking)
    manip: function() {
	this[0] = this['_'+arguments[0]].apply(this, slice.call(arguments, 1));
	return this;
    },
    end: function() {
	return this[0];
    },
    _low: function() {
	return this[0].toLowerCase();
    },
    _up: function() {
	return this[0].toUpperCase();
    },
    _upFirst: function() {
	return this[0].charAt(0).toUpperCase() + this[0].substr(1);
    },
    _upFirstAll: function() {
	return this[0].replace(/^([a-z])|\s+([a-z])/g, function (f) {
	    return f.toUpperCase();
	});
    },
    _rtrim: function() {
	return this[0].replace(new RegExp('[ \\s\u00A0]+$', 'g'), '');
    },
    _ltrim: function() {
	return this[0].replace(new RegExp('^[ \\s\u00A0]+', 'g'), '');
    },
    _trim: function() {
	return this[0].replace(/^\s+|\s+$/g, '');
    },
    _reverse: function() {
	return this[0].split('').reverse().join('');
    },
    _replace: function(src, copy, all) {

	var name, regex, len, i;
	
	// if copy is boolean assign value to all
	if (isBoolean(copy)) all = copy;

	if (isString(src) && isString(copy)) {
	    if (all) src = new RegExp(src, 'gi');
	    return this[0].replace(src, copy);
	}

	if (isArray(src) && isArray(copy)) {
	    for (i = 0, len = src.length; i < len; i++) this[0] = this._replace(src[i], copy[i], all);
	}

	if (isObject(src) && !isObject(copy)) {
	    for (name in src) {
		if (all) regex = new RegExp(name, 'gi');
		else regex = name;
		this[0] = this[0].replace(regex, src[name]);
	    }
	}

	return this[0];
    },
    _replaceAll: function() {
	var args = slice.call(arguments);
	args.push(true);
	return this._replace.apply(this, args);
    },
    _remove: function(str) {
	return this[0].replace(str, '');
    },
    _removeAll: function(str) {
	return this._replace(str, '', true);
    }
});

// generate public API methods
/*
    TODO maybe
	If _str.fn is well build this could be done globally based on all the methods available in _str.fn
	where all methods starting with _ have their equivalent in the public API. For now it is quite nice
	to developed with it hardcoded but definately have a look at it later down the line.
*/ 
each('low up upFirst upFirstAll rtrim ltrim trim reverse replace replaceAll remove removeAll', function(i, action) {
    _str.fn[action] = function() {
	var args = slice.call(arguments);
	args.unshift(action);
	return this.manip.apply(this, args);
    };
});
