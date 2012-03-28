/*! github.com/gillescochez/_str */

(function(){

// simplify access to slice function
var slice = Array.prototype.slice,
    
    // create constructor
    _str = function(str){
	return new _str.init(str);
    };

// initialization methods
_str.init = function(str) {

    // set instance data
    this.historyIndex = 0;
    this.history = [];
    this.data = {};

    // set the current string (or create an empty string)
    this[0] = str || '';

    // return object
    return this;
}

// init function prototype linking
_str.fn = _str.init.prototype;

// core methods
extend(_str.fn, {

    //execute all strings manipulation
    manip: function() {

	// add current string to the history
	this.history[this.historyIndex] = this[0];
	this.historyIndex++;

	// do the manipulation and update the string
	this[0] = this['_'+arguments[0]].apply(this, slice.call(arguments, 1));

	// return self to enable chainability
	return this;
    },

    // reset the string to the last modification recorded
    back: function() {
	var key = this.history.length - 1;
	if (key < 0) key = 0;
	this[0] = this.history[key];
	delete this.history[key];
	return this;
    },

    // store the current string
    set: function(key, value) {
	if (!value) this.data[key] = this[0];
	else this.data[key] = value;
	return this;
    },

    // retrieve stored strings
    get: function(key) {
	if (!key) return this.data;
	else return this.data[key] || null;
    },

    // return the history array
    getHistory: function() {
	return this.history;
    },

    // mapping of some basic string functions
    indexOf: function(str) {
	return this[0].indexOf(str);
    },

    lastIndexOf: function(str) {
	return this[0].lastIndexOf(str);
    },

    match: function(regex) {
	return this[0].match(regex);
    },

    search: function(regex) {
	return this[0].search(regex);
    },

    slice: function(begin, end) {

	// begin default to 0 if only 1 argument
	if (!end) {
	    end = begin;
	    begin = 0;
	}

	return this[0].slice(begin, end);
    },

    split: function(sep) {
	if (!sep) sep = ' ';
	return this[0].split(sep);
    },

    // write the current string to the document
    write: function() {
	document.write(this[0]);
    },

    // return the length of the current string
    size: function() {
	return this[0].length;
    },

    // return the current string
    end: function() {
	return this[0];
    }
});

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
    _addSlashes: function() {
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

// add basic methods
extend(_str.fn, {

    // convert return carriage to HTML line break
    _nl2br: function() {
	return this[0].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />');
    },

    // remove tags inside the current string
    _stripTags: function(allowed) {
	
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	    comments = /<!--[\s\S]*?-->/gi;

	return this[0].replace(comments, '').replace(tags, function ($0, $1) {
	    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
    },

    // remove slashes of the current string
    _stripSlashes: function() {
	return this[0].replace(/\\(.?)/g, function (ignore, text) {
	    switch (text) {
		case '\\': return '\\';
		case '0': return '\u0000';
		case '': return '';
		default: return text;
	    }
	});
    },

    // create a link with the current string
    _link: function(href, options) {
	
	if (isObject(href)) {
	    options = href;
	    href = options.href;
	    delete options.href;
	}

	var tag = '<a href="' + href + '"',
	    name;

	if (options) {
	    for (name in options) tag += ' ' + name + '="' + options[name] + '"';
	}

	return tag + '>' + this[0] + '</a>';
    },

    // convert URLS to links
    _urlsToLinks: function() {
	return this[0].replace(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function($0, $1) {
	    return '<a href="' + $0 + '">' + $0 + '</a>';   
	});
    },

    // convert email addresses to links
    _emailsToLinks: function() {
	return this[0].replace(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi, function($0, $1) {
	   return '<a href="mailto:' + $0 + '">' + $0 + '</a>';   
	});
    },
    _encodeEntities: function(quote) {

	var map = htmlEntitiesTable('HTML_ENTITIES', quote),
	    symbol = '';
	     
	if (!map) return false;
			         
	if (quote && quote === 'ENT_QUOTES') map["'"] = '&#039;';

	return this[0].replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
	    for (symbol in map) {
		if (map.hasOwnProperty(symbol)) text = text.split(symbol).join(map[symbol]);
	    }
	    return text + entity;
	});
    },

    // html entities to characters
    _decodeEntities: function(quote) {
	
	var map = {},
	    symbol = '',
	    entity = '';
					 
	if (false === (map = htmlEntitiesTable('HTML_ENTITIES', quote))) return false;
							  
	delete map['&'];
	map['&'] = '&amp;';
									   
	for (symbol in map) {
	    entity = map[symbol];
	    this[0] = this[0].split(entity).join(symbol);
	}

	this[0] = this[0].split('&#039;').join("'");
												        
	return this[0];
    },

    // html special characters to entities
    _encodeSpecial: function(quote, enc) {
    
	var optTemp = 0,
	    i = 0,
	    noquotes = false;

	if (typeof quote === 'undefined' || quote === null) quote = 2;
	
	string = this[0];
    
	if (enc !== false) string = string.replace(/&/g, '&amp;');

	string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
 
	var OPTS = {
	    'ENT_NOQUOTES': 0,
	    'ENT_HTML_QUOTE_SINGLE': 1,
	    'ENT_HTML_QUOTE_DOUBLE': 2,
	    'ENT_COMPAT': 2,
	    'ENT_QUOTES': 3,
	    'ENT_IGNORE': 4
	}
	if (quote === 0) noquotes = true;

	if (typeof quote !== 'number') { // Allow for a single string or an array of string flags
	    quote = [].concat(quote);
	    for (i = 0; i < quote.length; i++) {

		if (OPTS[quote[i]] === 0) noquotes = true;
		else if (OPTS[quote[i]]) optTemp = optTemp | OPTS[quote[i]];
	    }
	    quote = optTemp;
	}

	if (quote & OPTS.ENT_HTML_QUOTE_SINGLE) string = string.replace(/'/g, '&#039;');

	if (!noquotes) string = string.replace(/"/g, '&quot;');
 
	return string;
    },

    // html special entities to characters
    _decodeSpecial: function(quote) {

	var optTemp = 1,
	    i = 0,
	    noquotes = false;

	string = this[0];

	if (typeof quote === 'undefined') quote_style = 2;
	string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');

	var OPTS = {
	    'ENT_NOQUOTES': 0,
	    'ENT_HTML_QUOTE_SINGLE': 1,
	    'ENT_HTML_QUOTE_DOUBLE': 2,
	    'ENT_COMPAT': 2,
	    'ENT_QUOTES': 3,
	    'ENT_IGNORE': 4
	}

	if (quote === 0) noquotes = true;

	if (typeof quote !== 'number') {
	    quote = [].concat(quote_style);
	    for (i = 0; i < quote.length; i++) {
		// Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
		if (OPTS[quote[i]] === 0) noquotes = true;
		else if (OPTS[quote[i]]) optTemp = optTemp | OPTS[quote_style[i]];
	    }
	    quote = optTemp;
	}

	if (quote & OPTS.ENT_HTML_QUOTE_SINGLE) string = string.replace(/&#0*39;/g, "'");
	if (!noquotes) string = string.replace(/&quot;/g, '"');

	// Put this in last place to avoid escape being double-decoded
	string = string.replace(/&amp;/g, '&');

	return string;
    }
});

// html entities table helper
function htmlEntitiesTable(table, quote) {
    
    var entities = {},
        map = {},
        decimal,
	constMappingTable = {},
        constMappingQuoteStyle = {},
	useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote) ? constMappingQuoteStyle[quote] : quote ? quote.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            map[String.fromCharCode(decimal)] = entities[decimal];
        }
    }

    return map;
}

// helper function to extend objects
function extend(target, options) {

    // function scope variables
    var name, src, copy;

    // Extend the base object
    for (name in options) {
	
	// grab original and new value
	src = target[name];
	copy = options[name];

	// Prevent never-ending loop
	if (target === copy) continue;

	// Don't copy undefined values
	if (copy !== undefined) target[name] = copy;
    }

    // Return the modified object
    return target;
}

// helper function for basic loop
function each(data, fn) {

    var len, i;

    if (isString(data)) data = data.split(' ');

    len = data.length;

    if (isArray(data)) {
	for (i = 0; i < len; i++ ) fn(i, data[i]);
    } else {
	for (i in data) fn(i, data[i]);
    }
}

// string type check helper
function isString(it) {
    return typeof it === 'string';
}

// object type check helper
function isObject(it) {
    return typeof it  === 'object';
}

// boolean type check helper
function isBoolean(it) {
    return typeof it === 'boolean';
}

// array type check helper
function isArray(it) {
    if (isObject(it)) return it.constructor == Array;
    else return false;
}

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
