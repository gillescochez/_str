// add basic methods
extend(_str.fn, {
    _nl2br: function() {
	return this[0].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />');
    },
    _stripTags: function(allowed) {
	
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	    comments = /<!--[\s\S]*?-->/gi;

	return this[0].replace(comments, '').replace(tags, function ($0, $1) {
	    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
    }
});

// generate public API methods
each('nl2br stripTags', function(i, action) {
    _str.fn[action] = function() {
	return this.manip(action);
    };
});
