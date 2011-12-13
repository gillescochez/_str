// TODO: Improve manip method so arguments can be passed too

// add basic methods
extend(_str.fn, {
    manip: function(action) {
	this[0] = this['_'+action]();
	return this;
    },
    end: function() {
	return this[0];
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
    _nl2br: function(xhtml) {
	return this[0].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />');
    }
});

// generate public API methods
each('trim ltrim rtrim nl2br', function(i, action) {
    _str.fn[action] = function() {
	return this.manip(action);
    };
});
