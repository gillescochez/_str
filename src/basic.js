// TODO rewrite some methods so the variables name used are more consistant
// add basic methods
extend(_str.fn, {
    _eq: function(key) {
	return this[0].charAt(key);
    },
    _eqCode: function(key) {
	return this[0].charCodeAt(key);
    },
    _sub: function(start, end) {
	return this[0].substr(start, end);
    },
    _subReplace: function(replace, start, length) {
	if (start < 0) start = start + this[0].length;
	length = length !== undefined ? length : this[0].length;
	if (length < 0) length = length + this[0].length - start;
	return this[0].slice(0, start) + replace.substr(0, length) + replace.slice(length) + this[0].slice(start + length);
    },
    subCount: function(needle, offset, length) {
	
	var pos = 0,
	    cnt = 0;

	if (isNaN(offset)) offset = 0;
	if (isNaN(length)) length = 0;
	offset--;
 
	while ((offset = this[0].indexOf(needle, offset + 1)) != -1) {
	    if (length > 0 && (offset + needle.length) > length) return false;
	    else cnt++;
	}
 
	return cnt;
    },
    subCompare: function(str, offset, length, case_insensitivity) {

	var main = this[0];

	if (!offset && offset !== 0) throw 'Missing offset for substr_compare()';
	if (offset < 0) offset = main.length + offset;
 
	if (length && length > (main.length - offset)) return false;
	length = length || main.length - offset;
 
	main = main.substr(offset, length);
	str = str.substr(0, length);
	
	if (case_insensitivity) {
	    main = (main + '').toLowerCase();
	    str = (str + '').toLowerCase();
	    if (main == str) {
		return 0;
	    }
	    return (main > str) ? 1 : -1;
	}
	
	return ((main == str) ? 0 : ((main > str) ? 1 : -1));
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
    _replace: function(src, copy, all) {

	var name, regex, len, i;
	
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
    _remove: function(src, all) {
	
	var arr = [], 
	    len, i;

	if (isArray(src)) {
	    len = src.length;
	    for (i = 0; i < len; i++) arr[i] = '';
	    return this._replace(src, arr, all);
	}

	return this._replace(src, '', all);
    },
    _removeAll: function(src) {
	return this._remove(src, true);
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
    _concat: function() {
	
	if (!arguments.length) return this[0];
	
	var len = arguments.length,
	    i = 0;

	for (; i < len; i++) this[0] += arguments[i];
	
	return this[0];
    },
    _pad: function (pad_length, pad_string, pad_type) {
	var input = this[0],
	    half = '',
	    pad_to_go;

	var str_pad_repeater = function (s, len) {
	    var collect = '',
		i;

	    while (collect.length < len) {
		collect += s;
	    }
	    collect = collect.substr(0, len);

	    return collect;
	};

	pad_string = pad_string !== undefined ? pad_string : ' ';

	if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
	    pad_type = 'STR_PAD_RIGHT';
	}
	if ((pad_to_go = pad_length - input.length) > 0) {
	    if (pad_type == 'STR_PAD_LEFT') {
		input = str_pad_repeater(pad_string, pad_to_go) + input;
	    } else if (pad_type == 'STR_PAD_RIGHT') {
		input = input + str_pad_repeater(pad_string, pad_to_go);
	    } else if (pad_type == 'STR_PAD_BOTH') {
		half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
		input = half + input + half;
		input = input.substr(0, pad_length);
	    }
	}

	return input;
    },
    _addSlahes: function() {
	return this[0].replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    },
    _wrap: function(begin, end) {
	if (!end) end = begin;
	return begin + this[0] + end;
    },
    _append: function(str) {
	return this[0]+str;
    },
    _prepend: function(str) {
	return str+this[0];
    }
});
