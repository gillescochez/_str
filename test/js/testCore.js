test('Core system', function(){

    expect(2);

    ok(_str, '_str');

    var target = {a:1}, options = {b:2}, result = {a:1, b:2};
    deepEqual(_str.extend(target, options), result, '_str.extend');
});
console.log(_str('boo'));
console.log(_str('test ').trim().end().length);
