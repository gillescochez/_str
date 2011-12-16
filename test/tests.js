function encode_utf8( s ) {
    return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ) {
    return decodeURIComponent( escape( s ) );
}

// Test core functions
test('core.js', function(){
    
    // test count
    expect(11);

    // some basic core tests
    ok(_str, '_str');
    equal(_str.init('a')[0], 'a', 'basic string build with init');
    ok(_str.fn === _str.init.prototype, 'fn === in t prototype');

    // end, size and eq tests
    equal(_str('a').end(), 'a', 'end');
    equal(_str('abcd').size(), 4, 'size');
    equal(_str('abcd').eq(1).end(), 'b', 'eq');

    // history based tests
    equal(_str('a').append('b').back().end(), 'a', 'back method');
    deepEqual(_str('a').append('b').append('c').getHistory(), ['a','ab'], 'history array');

    // storage based tests
    equal(_str('a').set('test').append('b').get('test'), 'a', 'basic set / get');
    deepEqual(_str('a').set('testA').append('b').set('testAB').get(), {testA:'a',testAB:'ab'}, 'multiple set / get as object');
    equal(_str('a').set('test','foo').get('test'), 'foo', 'custom value set / get');

});

// Test basic functions
test('basic.js', function() {

    // test count
    expect(20);

    equal(_str('a').up().end(), 'A', 'up');
    equal(_str('aa bb').upFirst().end(), 'Aa bb', 'upFirst');
    equal(_str('aa bb').upFirstAll().end(), 'Aa Bb', 'upFirstAll');

    equal(_str('A').low().end(), 'a', 'low');
    equal(_str('AA BB').lowFirst().end(), 'aA BB', 'lowFirst');
    equal(_str('AA BB').lowFirstAll().end(), 'aA bB', 'lowFirstAll');
    
    equal(_str(' a ').trim().end(), 'a', 'trim');
    equal(_str(' a').ltrim().end(), 'a', 'ltrim');
    equal(_str('a ').rtrim().end(), 'a', 'rtrim');
    
    equal(_str('abcd').reverse().end(), 'dcba', 'reverse');

    // Multiple replace tests to cover all cases
    equal(_str('abcdabcd').replace('a', 'e').end(), 'ebcdabcd', 'replace(string, string)');
    equal(_str('abcdabcd').replaceAll('a','e').end(), 'ebcdebcd', 'replaceAll(string, string)');    
    equal(_str('abcdabcd').replace({a:'e'}).end(), 'ebcdabcd', 'replace(obj)');
    equal(_str('abcdabcd').replaceAll({a:'e'}).end(), 'ebcdebcd', 'replaceAll(obj)');
    equal(_str('abcdabcd').replace(['a'],['e']).end(), 'ebcdabcd', 'replace(array, array)');
    equal(_str('abcdabcd').replaceAll(['a'],['e']).end(), 'ebcdebcd', 'replaceAll(array, array)');

    // TODO Add tests for all cases
    equal(_str('abcdabcd').remove('a').end(), 'bcdabcd', 'remove');
    equal(_str('abcdabcd').removeAll('a').end(), 'bcdbcd', 'removeAll');

    equal(_str('a').append('b').end(), 'ab', 'append');
    equal(_str('b').prepend('a').end(), 'ab', 'prepend');

});

// Test HTML related strings functions
test('html.js', function() {

    // test count
    expect(9);
    
    // nl2br test case
    equal(_str('A\nB').nl2br().end(), 'A<br />B', 'nl2br');

    // stripping function
    equal(_str('<b>a</b>').stripTags().end(), 'a', 'stripTags');
    equal(_str('That\'s').stripSlashes().end(), "That's", 'stripSlahes');

    // html entities convertion
    equal(_str('£').encodeEntities().end(), '&pound;', 'encodeEntities');
    equal(_str('&pound;').decodeEntities().end(), decode_utf8('£'), 'decodeEntities');
    equal(_str('a & b').encodeSpecial().end(), 'a &amp; b', 'encodeSpecial');
    equal(_str('a &amp; b').decodeSpecial().end(), 'a & b', 'decodeSpecial');

    // detect and build <a> with URLs and emails found in the string
    equal(_str('http://google.com').urls().end(), '<a href="http://google.com">http://google.com</a>', 'urls');
    equal(_str('email@test.com').emails().end(), '<a href="mailto:email@test.com">email@test.com</a>', 'emails');

});
