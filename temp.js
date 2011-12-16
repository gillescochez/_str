var str;

str = _str('example').prepend('this is an ').append('.').upFirst().end();
console.log(str);
// str => "This is an example."

str = _str(' email@test.com bla bla bla http://google.com').emails().urls().end();
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

