// _str name space
var slice = Array.prototype.slice,
    _str = function(str){
    return new _str.init(str);
}

// our initialize function
_str.init = function(str) {
    this[0] = str;
    return this;
}

// init function prototype linking
_str.fn = _str.init.prototype;
