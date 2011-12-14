// TODO: Improve manip method so arguments can be passed too and so it keep an history of the changes

// add basic methods
extend(_str.fn, {
    manip: function(action) {
	this[0] = this['_'+action]();
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
	return this[0].replace(/^([a-z])|\s+([a-z])/g, function ($1) {
	    return $1.toUpperCase();
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
    }
});

// generate public API methods
each('trim ltrim rtrim low up upFirst upFirstAll', function(i, action) {
    _str.fn[action] = function() {
	return this.manip(action);
    };
});
