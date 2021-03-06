// Test core functions
test('core.js', function(){
     
    // test count
    expect(21);

    // some basic core tests
    ok(_str, '_str');
    equal(_str().end(), '', '_str() => empty string');
    equal(_str.init('a')[0], 'a', 'basic string build with init');
    ok(_str.fn === _str.init.prototype, 'fn === init prototype');

    // end, size, eq and eqCode tests
    equal(_str('a').end(), 'a', 'end');
    equal(_str('abcd').size(), 4, 'size');
    equal(_str('abcd').eq(1).end(), 'b', 'eq');
    equal(_str('a').eqCode(0).end(), 97, 'eqCode');

    // history based tests
    equal(_str('a').append('b').back().end(), 'a', 'back method');
    deepEqual(_str('a').append('b').append('c').getHistory(), ['a','ab'], 'history array');

    // storage based tests
    equal(_str('a').set('test').append('b').get('test'), 'a', 'basic set / get');
    deepEqual(_str('a').set('testA').append('b').set('testAB').get(), {testA:'a',testAB:'ab'}, 'multiple set / get as object');
    equal(_str('a').set('test','foo').get('test'), 'foo', 'custom value set / get');

    // indexOf / lastIndexOF
    equal(_str('abcd').indexOf('a'), 0, 'indexOf');
    equal(_str('abcdacbd').lastIndexOf('a'), 4, 'lastIndexOf');

    // match / search / slice / split / 
    deepEqual(_str('a b').split(), ['a','b'], 'split() (default " ")');
    deepEqual(_str('a,b').split(','), ['a','b'], 'split(,)');
    equal(_str('abcd').slice(1), 'a', 'slice(1)');
    equal(_str('abcd').slice(1,2), 'b', 'slice(1,2)');
    deepEqual(_str('abcd').match(/a/g), ['a'], 'match()');
    deepEqual(_str('abcd').search(/a/g), 0, 'search()');

});

// Test basic functions
test('basic.js', function() {

    // test count
    expect(30);

    // subtring methods
    equal(_str('abcd').sub(0,2).end(), 'ab', 'sub(0,2)');
    equal(_str('abcdabcd').subCount('ab'), 2, 'subCount(ab)');
    equal(_str('abcde').subCompare('bc', 1, 2), 0, 'subCompare(bc, 1, 2)');
    equal(_str('abcd').subReplace('AB', 0).end(), 'AB', 'subReplace(AB, 0)');
    equal(_str('abcd').subReplace('AB', 0, 2).end(), 'ABcd', 'subReplace(AB, 0, 2)');

    // uppercasing
    equal(_str('a').up().end(), 'A', 'up');
    equal(_str('aa bb').upFirst().end(), 'Aa bb', 'upFirst');
    equal(_str('aa bb').upFirstAll().end(), 'Aa Bb', 'upFirstAll');

    // lowercasing
    equal(_str('A').low().end(), 'a', 'low');
    equal(_str('AA BB').lowFirst().end(), 'aA BB', 'lowFirst');
    equal(_str('AA BB').lowFirstAll().end(), 'aA bB', 'lowFirstAll');
    
    // triming
    equal(_str(' a ').trim().end(), 'a', 'trim');
    equal(_str(' a').ltrim().end(), 'a', 'ltrim');
    equal(_str('a ').rtrim().end(), 'a', 'rtrim');
    
    // reversing
    equal(_str('abcd').reverse().end(), 'dcba', 'reverse');

    // wrapping up
    equal(_str('abcd abcd abcd').wordwrap(10, '<br />').end(), 'abcd abcd <br />abcd', 'wordwrap(10, <br />)');

    // add slashes
    equal(_str("abc'd").addSlashes().end(), "abc\\'d", 'addSlashes');
   // console.log(_str('abcd abcd abcd').addSlashes().end());

    // Multiple replace tests to cover all cases
    equal(_str('abcdabcd').replace('a', 'e').end(), 'ebcdabcd', 'replace(string, string)');
    equal(_str('abcdabcd').replaceAll('a','e').end(), 'ebcdebcd', 'replaceAll(string, string)');    
    equal(_str('abcdabcd').replace({a:'e'}).end(), 'ebcdabcd', 'replace(obj)');
    equal(_str('abcdabcd').replaceAll({a:'e'}).end(), 'ebcdebcd', 'replaceAll(obj)');
    equal(_str('abcdabcd').replace(['a'],['e']).end(), 'ebcdabcd', 'replace(array, array)');
    equal(_str('abcdabcd').replaceAll(['a'],['e']).end(), 'ebcdebcd', 'replaceAll(array, array)');

    // TODO Add tests for all cases
    equal(_str('abcdabcd').remove('a').end(), 'bcdabcd', 'remove(str)');
    equal(_str('abcdabcd').removeAll('a').end(), 'bcdbcd', 'removeAll(str)');
    equal(_str('abcdabcd').remove(['a','c']).end(), 'bdabcd', 'remove(array)');
    equal(_str('abcdabcd').removeAll(['a','c']).end(), 'bdbd', 'removeAll(array)');

    equal(_str('a').concat('b','c','d').end(), 'abcd', 'concat');
    equal(_str('a').append('b').end(), 'ab', 'append');
    equal(_str('b').prepend('a').end(), 'ab', 'prepend');

});

// Test HTML related strings functions
test('html.js', function() {

    // test count
    expect(12);
    
    // nl2br test case
    equal(_str('A\nB').nl2br().end(), 'A<br />B', 'nl2br');

    // stripping function
    equal(_str('<b>a</b>').stripTags().end(), 'a', 'stripTags');
    equal(_str('That\'s').stripSlashes().end(), "That's", 'stripSlahes');

    // html entities convertion
    equal(_str('£').encodeEntities().end(), '&pound;', 'encodeEntities');
    equal(_str('&pound;').decodeEntities().end(), '£', 'decodeEntities');
    equal(_str('a & b').encodeSpecial().end(), 'a &amp; b', 'encodeSpecial');
    equal(_str('a &amp; b').decodeSpecial().end(), 'a & b', 'decodeSpecial');

    // detect and build <a> with URLs and emails found in the string
    equal(_str('http://google.com').urlsToLinks().end(), '<a href="http://google.com">http://google.com</a>', 'urlsToLinks');
    equal(_str('email@test.com').emailsToLinks().end(), '<a href="mailto:email@test.com">email@test.com</a>', 'emailsToLinks');

    // link method test cases
    equal(_str('abcd').link('http://google.com').end(), '<a href="http://google.com">abcd</a>', 'link(href)');
    equal(_str('abcd').link('http://google.com', {target: '_blank'}).end(), '<a href="http://google.com" target="_blank">abcd</a>', 'link(href, options)');
    equal(_str('abcd').link({href: 'http://google.com', target: '_blank'}).end(), '<a href="http://google.com" target="_blank">abcd</a>', 'link(options)');



});
