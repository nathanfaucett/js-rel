var tape = require("tape"),
    rel = require(".."),
    adapter = require("./adapter"),
    table = require("./table");


tape("order(by: rel.consts.ASC or rel.consts.DESC)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .select()
        .order(rel.consts.DESC)
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    'users.email': 'bill@bill.com',
                    'users.id': 3
                }, {
                    'users.email': 'frank@frank.com',
                    'users.id': 2
                }, {
                    'users.email': 'new@new.com',
                    'users.id': 1
                }]);
                assert.end();
            }
        });
});
