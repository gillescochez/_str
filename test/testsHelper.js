// Test core functions
test('helper.js', function(){
    
    // test count
    expect(4);

    // extend helper test
    var target = {a:1}, options = {b:2}, result = {a:1, b:2};
    deepEqual(extend(target, options), result, 'extend helper');

    // each helper test
    var array = ['a','b'], resArray = [];
    each('a b', function(i, val) { resArray[i] = val; });
    deepEqual(array, resArray, 'each helper');

    // isString helper test
    ok(isString('a'), 'isString');

    // isArray helper test
    ok(isArray(['a']), 'isArray');

});
