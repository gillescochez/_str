// Create JStrings namespace/class
var JStrings = function(options){
    this.settings = this._extend(this.defaults, options); 
}

// JStrings default settings
JStrings.defaults = {

};

// internal helper function to extend objects
JStrings._extend = function(target, options) {

	// function scope variables
	var name, src, copy;

	// Extend the base object
	for (name in options) {
	    
	    src = target[name];
	    copy = options[name];

	    // Prevent never-ending loop
	    if (target === copy) continue;

	    // Don't copy undefined values
	    if (copy !== undefined) target[name] = copy;
	}

	// Return the modified object
	return target;
};
