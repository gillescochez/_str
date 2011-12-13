extend(_str.fn, {
    manip: function(action) {
	this[0] = this['_'+action]();
	return this;
    },
    end: function() {
	return this[0];
    },
    _trim: function() {
	return this[0].replace(/^\s+|\s+$/g, '');
    },
    _nl2br: function() {
	return this[0].replace( "/n", '<br />');
    }
});

each('trim nl2br', function(i, action) {
    _str.fn[action] = function() {
	return this.manip(action);
    };
});
