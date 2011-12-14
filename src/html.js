// add basic methods
extend(_str.fn, {
    _nl2br: function() {
	return this[0].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />');
    }   
});

// generate public API methods
each('nl2br', function(i, action) {
    _str.fn[action] = function() {
	return this.manip(action);
    };
});
