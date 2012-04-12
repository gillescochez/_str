# \_str

\_str is a chainable library which aim to simplify string manipulation and handling. \_str will also keep an history of all the modification it has made so it is easy to rollback any changes. It is also possible to store manipulation state which can later be retrieved individually or as a all (useful if you can have one chain for all your changes but need multiple formatted version of the original strings.

## Examples

```javascript

var str;

str = _str('example').prepend('this is an ').append('.').upFirst().end();
console.log(str);
// str => "This is an example."

str = _str(' email@test.com bla bla bla http://google.com').emailsToLinks().urlsToLinks().end();
console.log(str);
// str => "<a href="mailto:email@test.com">email@test.com</a> <a href="http://google.com">http://google.com</a>"

str = _str('abcd').set('original').reverse().set('reverse').set('custom','data').get();
console.log(str);
// str => {original:'abcd', reverse: 'dcba', custom:'data'}

var tpl = 'My name is {firstName} {lastName}.';

str = _str(tpl).replace(['{firstName}', '{lastName}'],['Gilles', 'Cochez']).end();
console.log(str);
// str => "My name is Gilles Cochez."

str = _str(tpl).replace({'{firstName}': 'Gilles', '{lastName}': 'Cochez'}).end();
console.log(str);
// str => "My name is Gilles Cochez."

```

## API

### Core Methods

#### manip()

Function used internally to do all API calls and handle string versioning

#### back()

Reverse the string to the last modification recorded.

#### set(String ref [, Mix value])

1 argument: Store the current string state to a given reference

2 arguments: Store a value for a given reference

#### get([String ref])

1 argument: Return a state of string matching the given reference.

#### getHistory()

Return the history object

#### indexOf(String str)

String.indexOf wrapper

#### lastIndexOf(String str)

String.lastIndexOf wrapper

#### match(Regex exp)

String.match wrapper

#### search(Regex exp)

String.search wrapper

#### slice(Integer start [, Integer end])

String.slice wrapper

1 argument: Argument is used as end limiter and 0 is used as start

2 arguments: Both start and end are set by the arguments

#### split([String]) 

String.split wrapper

0 argument: seperator default to " "

1 argument: seperator = argument

#### write()

Document.write(_current_string_) wrapper

#### size()

Return the current string length

#### end()

Return the current string

### Basic Manipulations

#### eq

String.charAt wrapper

#### eqCode

String.charCodeAt wrapper

#### sub

String.substr wrapper

#### subReplace

Replace a substring of the current string with another string

#### subCount(String needle [, Integer offset = 0 [, int length ]] )

Returns the number of times the needle substring occurs in the haystack string. Please note that needle is case sensitive.

#### subCompare(String str , Integer offset [, Integer length [, Boolean case_insensitivity]] )

Compares the current string from position offset with str up to length characters.

#### low()

String.toLowerCase() wrapper

#### lowFirst()

Lower the case of the first charater for the current string

#### lowFirstAll()

Lower the first character of every words inside the current string

#### up()

String.toUpperCase() wrapper

#### upFirst()

Up the case of the first character of the current string

#### upFirstAll()

Up the case of the first character of every words in the current string

#### rtrim()

Remove all spaces from the right of the current string

#### ltrim()

Remove all spaces from the left of the current string

#### trim()

Remove all spaces from the left and the right of the current string

#### reverse()

Reverse the order of characters in the current string

#### replace(String | Object | Array source [, String | Array copy, Boolean all])

Replace strings with other strings. Can take string, arrays and objects as argument. 
Set all to true to replace each instances of a string instead of the first one found.

#### replaceAll(String | Object | Array source [, String | Array copy)

Same as above, actually call the method above but always passing all as true.

#### remove(String | Array str [,Boolean all])

Remove a given string from the current string, if all is true all occurence will be removed instead of the first one found.

#### removeAll(String | Array str)

Same as above but always replace all occurences.

#### wordwrap

Wraps buffer to selected number of characters using string break character

#### concat(String n1[,String n2....String nx])

Append one or multiple string(s) to the current string

#### addSlashes

Escapes single quote, double quotes and backslash characters in current string with backslashes 

#### wrap(String start[, String end])

1 argument: Append and prepend start to the current string

2 arguments: Prepend start and append end to the current string

#### append(String str)

Add a given at the end of the current string

#### prepend(String str)

Add a given string at the beginning of the current string

### HTML Manipulations

#### nl2br

Convert return carriage to BR element

#### stripTags

Remove all tags from the current string

#### stripSlashes

Remove all slashes from the current string

#### link

Create a link using the current string

#### urlsToLinks

Convert URLs found in the current string into HTML hyperlinks

#### emailsToLinks

Convert emails found in the current string into HTML hyperlinks

#### encodeEntities

Encode entities in the current string

#### decodeEntities

Decode entities in the current string

#### encodeSpecial

Encode HTML special characters in the current string

#### decodeSpecial

Decode HTML special characters in the current string

## Credits

Structure is inspired by jQuery (http://jquery.com) and strings manipulation methods are inspired and/or partially taken from phpjs (http://phpjs.org).

Thanks to both projects for their amazing work.
