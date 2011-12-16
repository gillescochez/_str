# \_str

\_str is a javascript chainable library which was created to do string manipulation with ease (and give a

## Examples

```javascript
var str;

str = _str('example').prepend('this is an').append('.').upFirst().end();
// str => "This is an example."

str = _str('email@test.com http://google.com').emails().urls().end();
// str => "<a href="mailto:email@test.com">email@test.com</a> <a href="http://google.com">http://google.com</a>"

```

## Credits

Structure is inspired by jQuery (http://jquery.com) and strings manipulation methods are inspired or partially taken from phpjs (http://phpjs.org).

Thanks to both projects for their amazing work.
