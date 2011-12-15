// Test core functions
test('core.js', function(){
    
    // test count
    expect(3);

    // make sure _str is exposed
    ok(_str, '_str');
    equal(_str.init('a')[0], 'a', 'basic string build with init');
    ok(_str.fn === _str.init.prototype, 'fn === in t prototype');
});

// Test basic functions
test('basic.js', function() {

    // test count
    expect(21);

    // tests setup
    equal(_str('a').end(), 'a', 'end');

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
    expect(1);
    
    // tests setup
    equal(_str('A\nB').nl2br().end(), 'A<br />B', 'nl2br');
});
