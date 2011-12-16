// add basic methods
extend(_str.fn, {
    _eq: function(key) {
	return this[0].substr(key, 1);
    },
    // TODO extend so we can pass it character keys to up character in specific location (low(int), low(array))
    // If boolean are passed used to create shortcut to lowFirst (low(true)) and lowFirstAll (low(true,true))
    _low: function() {
	return this[0].toLowerCase();
    },
    _lowFirst: function() {
	return this[0].charAt(0).toLowerCase() + this[0].substr(1);
    },
    _lowFirstAll: function() {
	return this[0].replace(/^([A-Z])|\s+([A-Z])/g, function (f) {
	    return f.toLowerCase();
	});
    },
    // TODO extend so we can pass it character keys to up character in specific location (up(int), up(array))
    // If boolean are passed used to create shortcut to upFirst (up(true)) and upFirstAll (up(true,true))
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
	return this[0].replace(/[ \\s\u00A0]+$/g, '');
    },
    _ltrim: function() {
	return this[0].replace(/^[ \\s\u00A0]+/g, '');
    },
    _trim: function() {
	return this[0].replace(/^\s+|\s+$/g, '');
    },
    _reverse: function() {
	return this[0].split('').reverse().join('');
    },
    // TODO Improve replace
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
    // TODO make remove as flexible as replace
    _remove: function(str) {
	return this[0].replace(str, '');
    },
    _removeAll: function(str) {
	return this._replace(str, '', true);
    },
    _wordwrap: function(width, sep, cut) {

	var m = width || 75,
	    b = sep || "\n",
	    c = cut || false,
	    i, j, l, s, r;

	str = this[0];

	if (m < 1) return str;

	for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
	    for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
		j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] 
		? m : j.input.length - j[0].length || c == 1 && m || j.input.length 
		+ (j = s.slice(m).match(/^\S*/)).input.length;
	    }
	}

	return r.join("\n");
    },
    _append: function(str) {
	return this[0]+str;
    },
    _prepend: function(str) {
	return str+this[0];
    }
});
