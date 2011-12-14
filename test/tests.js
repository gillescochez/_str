// Test core functions
test('core.js', function(){
    
    // test count
    expect(3);

    // make sure _str is exposed
    ok(_str, '_str is exposed');

    // extend helper test
    var target = {a:1}, options = {b:2}, result = {a:1, b:2};
    deepEqual(_str.extend(target, options), result, 'extend helper');

    // each helper test
    var array = ['a','b'], resArray = [];
    _str.each('a b', function(i, val) { resArray[i] = val; });
    deepEqual(array, resArray, 'each helper');

});

// Test basic functions
test('basic.js', function() {

    // test count
    expect(8);

    // tests setup
    equal(_str('a').end(), 'a', 'end');
    equal(_str('a').up().end(), 'A', 'up');
    equal(_str('A').low().end(), 'a', 'low');
    equal(_str(' a ').trim().end(), 'a', 'trim');
    equal(_str(' a').ltrim().end(), 'a', 'ltrim');
    equal(_str('a ').rtrim().end(), 'a', 'rtrim');
    equal(_str('aa bb').upFirst().end(), 'Aa bb', 'upFirst');
    equal(_str('aa bb').upFirstAll().end(), 'Aa Bb', 'upFirstAll');

});

// Test HTML related strings functions
test('html.js', function() {

    // test count
    expect(1);
    
    // tests setup
    equal(_str('A\nB').nl2br().end(), 'A<br />B', 'nl2br');
});
