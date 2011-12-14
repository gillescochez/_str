// TODO: Improve manip method so arguments can be passed too and so it keep an history of the changes

// add basic methods
extend(_str.fn, {
    manip: function() {
	this[0] = this['_'+arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
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
    // TODO Better handling of variables (type, length of both obj correct....)
    _replace: function(src, copy, all) {
	if (isString(src) && isString(copy)) {
	    if (all) src = new RegExp(src, 'gi');
	    return this[0].replace(src, copy);
	} else {
	    for(var i = 0, l = src.length; i < len; i++) this[0] = this[0].replace(src[i], copy[i]);
	    return this[0];
	}
    },
    _replaceAll: function(src, copy) {
	return this._replace(src, copy, true);
    }
});

// generate public API methods
/*
    TODO maybe
	If _str.fn is well build this could be done globally based on all the methods available in _str.fn
	where all methods starting with _ have their equivalent in the public API. For now it is quite nice
	to developed with it hardcoded but definately have a look at it later down the line.
*/ 
each('low up upFirst upFirstAll rtrim ltrim trim reverse replace replaceAll', function(i, action) {
    _str.fn[action] = function() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(action);
	return this.manip.apply(this, args);
    };
});
