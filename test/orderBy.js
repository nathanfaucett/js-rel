var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("orderBy(by: Array<String>)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .orderBy([users.attributes.id])
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    'users.email': 'new@new.com',
                    'users.id': 1
                }, {
                    'users.email': 'frank@frank.com',
                    'users.id': 2
                }, {
                    'users.email': 'bill@bill.com',
                    'users.id': 3
                }]);
                assert.end();
            }
        });
});
