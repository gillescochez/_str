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

## Credits

Structure is inspired by jQuery (http://jquery.com) and strings manipulation methods are inspired and/or partially taken from phpjs (http://phpjs.org).

Thanks to both projects for their amazing work.
