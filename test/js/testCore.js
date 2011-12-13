test('Core system', function(){

    expect(2);

    ok(_str, '_str exists');

    var target = {a:1},
	options = {b:2},
	result = {a:1, b:2};

    deepEqual(_str.extend(target, options), result, '_str._extend works');
});

console.log(_str('test'));
