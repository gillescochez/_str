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
